import { Category } from "@/types";

const getCategory = async (id: string): Promise<Category> => {
  try {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;
    const res = await fetch(`${URL}/${id}`, {
      next: { revalidate: 0 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch category: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error in getCategory:", error);
    throw error;
  }
};

export default getCategory;