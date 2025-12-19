
import { doc, onSnapshot } from "firebase/firestore";
import { getDb } from "@/lib/firebase/init";
import type { FuelData } from "@/lib/types";

class FuelService {
  /**
   * Subscribes to real-time updates for the latest fuel prices.
   * @param onData Callback function to handle incoming data.
   * @param onError Callback function to handle errors.
   * @returns An unsubscribe function to stop listening for updates.
   */
  onLatestFuelData(
    onData: (data: FuelData) => void,
    onError: (error: Error) => void
  ) {
    const db = getDb();
    if (!db) {
        const error = new Error("Firebase is not initialized. Check your environment variables.");
        onError(error);
        return () => {}; // Return an empty unsubscribe function
    }

    const docRef = doc(db, "fuelPrices", "latest");

    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          onData(docSnap.data() as FuelData);
        } else {
          // Document doesn't exist, might be initial state
          onError(new Error("Fuel price data document does not exist."));
        }
      },
      (error) => {
        // Handle snapshot listener errors
        console.error("Firebase onSnapshot error:", error);
        onError(error);
      }
    );

    return unsubscribe;
  }
}

// Export a singleton instance of the service
export const fuelService = new FuelService();
