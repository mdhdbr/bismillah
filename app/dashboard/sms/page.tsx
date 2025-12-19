

'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { conversations as initialConversations, drivers } from '@/lib/data';
import type { Conversation, Message } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { format, parseISO } from 'date-fns';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, User, Building, Car, MessageCircle, Dot, MessageSquare, BellOff, BellRing, CornerUpLeft, CornerUpRight, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger, ContextMenuSeparator } from '@/components/ui/context-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useDispatchStore } from '@/store/dispatch-store';
import { useRouter } from 'next/navigation';

const contactTypeIcons = {
    Passenger: <Car className="h-4 w-4" />,
    Agent: <User className="h-4 w-4" />,
    Driver: <User className="h-4 w-4" />,
    Shipper: <Building className="h-4 w-4" />,
};

function SmsPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  const { setPickup, setDropoff } = useDispatchStore();
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState('');
  
  const [showSnoozeDialog, setShowSnoozeDialog] = useState(false);
  const [snoozeTime, setSnoozeTime] = useState(5);
  const [snoozeTarget, setSnoozeTarget] = useState<string | null>(null);

  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedConversation?.messages]);

  useEffect(() => {
    const driverId = searchParams.get('driverId');
    if (driverId) {
      const driver = drivers.find(d => d.id === driverId);
      if (driver) {
        let conversation = conversations.find(c => c.contactName === driver.user.name || c.contactName === `Driver ${driver.user.name}`);
        
        if (!conversation) {
          const initialMessage: Message = {
            id: `msg-${Date.now()}`,
            sender: 'me',
            content: 'Hi',
            timestamp: new Date().toISOString(),
          };

          const newConversation: Conversation = {
            id: `conv-${Date.now()}`,
            contactName: driver.user.name,
            contactType: 'Driver',
            lastMessage: initialMessage.content,
            lastMessageTime: initialMessage.timestamp,
            messages: [initialMessage],
            isUnread: false,
          };
          
          setConversations(prev => [newConversation, ...prev]);
          setSelectedConversation(newConversation);
        } else {
          setSelectedConversation(conversation);
        }
      }
    } else if (conversations.length > 0) {
      const firstUnread = conversations.find(c => c.isUnread);
      setSelectedConversation(firstUnread || conversations[0]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleSendMessage = () => {
    if (newMessage.trim() === '' || !selectedConversation) return;
    
    const message: Message = {
      id: `msg-${Date.now()}`,
      sender: 'me',
      content: newMessage,
      timestamp: new Date().toISOString(),
    };
    
    const updatedConversations = conversations.map(conv => {
        if (conv.id === selectedConversation.id) {
            const newMessages = [...conv.messages, message];
            const updatedConv = {
                ...conv,
                messages: newMessages,
                lastMessage: newMessage,
                lastMessageTime: new Date().toISOString(),
                isUnread: false, // Mark as read on reply
            };
            setSelectedConversation(updatedConv);
            return updatedConv;
        }
        return conv;
    });

    setConversations(updatedConversations);
    setNewMessage('');
  };
  
  const toggleUnread = (conversationId: string, forceUnread?: boolean) => {
    const conv = conversations.find(c => c.id === conversationId);
    if (!conv) return;

    const currentlyUnread = conv.isUnread;
    const makeUnread = forceUnread ?? !currentlyUnread;

    if (makeUnread) {
      // If we are forcing it to unread, show snooze dialog
      setSnoozeTarget(conversationId);
      setShowSnoozeDialog(true);
    } else {
      // Mark as read
      setConversations(convs => convs.map(c => 
        c.id === conversationId ? { ...c, isUnread: false } : c
      ));
      toast({ title: 'Marked as Read', description: `Conversation with ${conv.contactName} marked as read.` });
    }
  };
  
  const handleSnooze = () => {
      if (!snoozeTarget) return;
      const conv = conversations.find(c => c.id === snoozeTarget);
      if(!conv) return;

      setConversations(convs => convs.map(c => 
        c.id === snoozeTarget ? { ...c, isUnread: false } : c
      ));

      toast({
          title: 'Snoozed!',
          description: `Conversation with ${conv.contactName} will reappear in ${snoozeTime} minutes.`
      });

      setTimeout(() => {
          setConversations(convs => convs.map(c => 
            c.id === snoozeTarget ? { ...c, isUnread: true } : c
          ));
          toast({
              title: 'Reminder',
              description: `Conversation with ${conv.contactName} is pending a reply.`
          });
      }, snoozeTime * 60 * 1000);

      setShowSnoozeDialog(false);
      setSnoozeTarget(null);
  };

  const handleCopyToDispatch = (type: 'pickup' | 'dropoff') => {
    const selection = window.getSelection()?.toString().trim();
    if (!selection) {
      toast({ variant: 'destructive', title: "No text selected", description: "Please highlight the location text in the message." });
      return;
    }
    if (type === 'pickup') {
      setPickup(selection);
    } else {
      setDropoff(selection);
    }
    toast({ title: "Location Copied", description: `"${selection}" copied for ${type}.` });
    router.push('/dashboard/dispatch');
  };


  const displayedConversations = useMemo(() => {
    return [...conversations].sort((a,b) => parseISO(b.lastMessageTime).getTime() - parseISO(a.lastMessageTime).getTime());
  }, [conversations]);

  const unreadCount = useMemo(() => {
    return conversations.filter(c => c.isUnread).length;
  }, [conversations]);

  return (
    <>
      <PageHeader
        title="SMS & Chat"
        description="Communicate with passengers, drivers, agents, and shippers."
      />
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 h-[calc(100vh-200px)]">
        <Card className="md:col-span-1 lg:col-span-1 flex flex-col">
          <CardHeader>
             <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CardTitle>Conversations</CardTitle>
                {unreadCount > 0 && <Badge variant="destructive">{unreadCount}</Badge>}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0 flex-1">
            <ScrollArea className="h-full">
              <div className="p-2 space-y-1">
                {displayedConversations.map(conv => {
                    return (
                        <ContextMenu key={conv.id}>
                           <ContextMenuTrigger>
                                <div
                                    onClick={() => setSelectedConversation(conv)}
                                    className={cn(
                                    'p-3 rounded-lg cursor-pointer transition-colors relative',
                                    selectedConversation?.id === conv.id
                                        ? 'bg-accent text-accent-foreground'
                                        : 'hover:bg-accent/50',
                                    conv.isUnread && selectedConversation?.id !== conv.id && 'bg-primary/5'
                                    )}
                                >
                                    {conv.isUnread && <Dot className="absolute top-1/2 -translate-y-1/2 left-0 h-6 w-6 text-blue-500"/>}
                                    <div className="flex items-center justify-between ml-3">
                                        <div className={cn("font-semibold", conv.isUnread && "text-primary")}>{conv.contactName}</div>
                                        <div className="text-xs text-muted-foreground">{format(parseISO(conv.lastMessageTime), 'p')}</div>
                                    </div>
                                    <div className="flex items-center justify-between mt-1 ml-3">
                                        <p className={cn("text-sm truncate pr-4", conv.isUnread ? "text-foreground font-medium" : "text-muted-foreground")}>{conv.lastMessage}</p>
                                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                            {contactTypeIcons[conv.contactType]}
                                            <span>{conv.contactType}</span>
                                        </div>
                                    </div>
                                </div>
                            </ContextMenuTrigger>
                            <ContextMenuContent>
                                {conv.isUnread ? (
                                    <ContextMenuItem onClick={() => toggleUnread(conv.id, false)}>
                                        <BellOff className="mr-2 h-4 w-4"/>
                                        Mark as Read
                                    </ContextMenuItem>
                                ) : (
                                     <ContextMenuItem onClick={() => toggleUnread(conv.id, true)}>
                                        <BellRing className="mr-2 h-4 w-4"/>
                                        Mark as Unread...
                                    </ContextMenuItem>
                                )}
                            </ContextMenuContent>
                        </ContextMenu>
                    );
                })}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 lg:col-span-3 flex flex-col h-full">
          {selectedConversation ? (
            <>
              <CardHeader className="border-b">
                 <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarFallback>{selectedConversation.contactName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <CardTitle>{selectedConversation.contactName}</CardTitle>
                         <p className="text-sm text-muted-foreground">{selectedConversation.contactType}</p>
                    </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 p-0">
                <ScrollArea className="h-full">
                    <ContextMenu>
                        <ContextMenuTrigger className="w-full h-full">
                            <div className="p-6 space-y-4">
                                {selectedConversation.messages.map(message => (
                                    <div key={message.id} className={cn('flex items-end gap-2', message.sender === 'me' ? 'justify-end' : 'justify-start')}>
                                        {message.sender === 'other' && <Avatar className="h-8 w-8"><AvatarFallback>{selectedConversation.contactName.charAt(0)}</AvatarFallback></Avatar>}
                                        <div className={cn('max-w-xs lg:max-w-md p-3 rounded-2xl', message.sender === 'me' ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-muted rounded-bl-none')}>
                                            <p className="text-sm select-text">{message.content}</p>
                                            <p className="text-xs mt-1 opacity-70 text-right">{format(parseISO(message.timestamp), 'p')}</p>
                                        </div>
                                    </div>
                                ))}
                                <div ref={endOfMessagesRef} />
                            </div>
                        </ContextMenuTrigger>
                        <ContextMenuContent>
                            <ContextMenuItem onSelect={() => handleCopyToDispatch('pickup')}>
                                <CornerUpLeft className="mr-2 h-4 w-4" />
                                Copy for Pickup Location
                            </ContextMenuItem>
                            <ContextMenuItem onSelect={() => handleCopyToDispatch('dropoff')}>
                                <CornerUpRight className="mr-2 h-4 w-4" />
                                Copy for Dropoff Location
                            </ContextMenuItem>
                            <ContextMenuSeparator />
                             <ContextMenuItem onSelect={() => router.push('/dashboard/dispatch')}>
                                <MapPin className="mr-2 h-4 w-4" />
                                Go to Dispatch
                            </ContextMenuItem>
                        </ContextMenuContent>
                    </ContextMenu>
                </ScrollArea>
              </CardContent>
              <div className="p-4 border-t">
                  <div className="flex items-center gap-2">
                      <Input 
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      />
                      <Button onClick={handleSendMessage}>
                          <Send className="h-4 w-4"/>
                          <span className="sr-only">Send</span>
                      </Button>
                  </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <p>Select a conversation to view messages</p>
            </div>
          )}
        </Card>
      </div>

       <Dialog open={showSnoozeDialog} onOpenChange={setShowSnoozeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Mark as Unread & Snooze</DialogTitle>
            <DialogDescription>
              This conversation will be marked as unread. Set a time to be reminded.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="snooze-time" className="text-right">
                Remind in
              </Label>
              <Input
                id="snooze-time"
                type="number"
                value={snoozeTime}
                onChange={(e) => setSnoozeTime(Number(e.target.value))}
                className="col-span-2"
              />
              <span className="col-span-1">minutes</span>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowSnoozeDialog(false)}>Cancel</Button>
            <Button onClick={handleSnooze}>Set Reminder</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default function SmsPage() {
    return (
        <SmsPageContent />
    )
}
