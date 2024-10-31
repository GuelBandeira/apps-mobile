import AsyncStorage from
  "@react-native-async-storage/async-storage";

import { SpendingStorageDTO } from "./SpendingStorageDTO";
import { SPENDING_COLLECTION } from "../StorageConfig";
import { spendingGetAll } from "./spendingGetAll";

export async function spendingCreate(newSpending: SpendingStorageDTO) {
  try {
    const storageSpending = await spendingGetAll()

    const storage = [...storageSpending, newSpending]

    const data = await AsyncStorage.setItem(SPENDING_COLLECTION,
      JSON.stringify(storage))
    return data
  } catch (error) {
    console.log(error)
    throw error;
  }
}