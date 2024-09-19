import { APIResponse, Card, Cards, Process } from "@src/types/apiTypes";
import { apiUrl, fetchWithAuth } from "./api";

const pool: { [key: string]: Promise<any> } = {};

export const getCardById = async (cardId: string, signal?: AbortSignal) => {
  if (pool[cardId]) {
    console.log(`Reusing request for card: ${cardId}`);
    return pool[cardId];
  }

  const fetchPromise = async () => {
    try {
      const response = await fetchWithAuth(`${apiUrl}/api/card/${cardId}`, {}, signal);
      if (response.success) {
        return response.card;
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      throw new Error(error.message);
    } finally {
      delete pool[cardId];
    }
  };

  const promise = fetchPromise();

  pool[cardId] = promise;

  return await promise;
};

export const createProcess = async (process: Process): Promise<APIResponse<Process>> => {
  return await fetchWithAuth(`${apiUrl}/api/process`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(process),
  });
};

export const getProcessCards = async (
  processId: string,
  offset: number,
  limit: number,
  signal?: AbortSignal
) => {
  const url = new URL(`${apiUrl}/api/card/process/${processId}`);

  url.searchParams.append("offset", offset.toString());
  url.searchParams.append("limit", limit.toString());

  const response = await fetchWithAuth(url.toString(), {}, signal);

  if (response.success) {
    return {
      cards: response.cards,
      totalCards: response.totalCards,
    };
  } else {
    throw new Error(response.message);
  }
};


export const createCard = async (card: Card) => {
  const response = await fetchWithAuth(`${apiUrl}/api/card`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(card),
  });
  if (response.success) {
    return response.newCard;
  } else {
    throw new Error(response.message);
  }
};

export const deleteCard = async (cardId: string) => {
  const response = await fetchWithAuth(`${apiUrl}/api/card/${cardId}`, {
    method: "DELETE",
  });
  if (response.success) {
    return response.deletedCard;
  } else {
    throw new Error(response.message);
  }
};

export const updateCard = async (cardId: string, updatedCard: Partial<Card>) => {
  const response = await fetchWithAuth(`${apiUrl}/api/card/${cardId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedCard),
  });

  if (response.success) {
    return response.updatedCard;
  } else {
    throw new Error(response.message);
  }
};
