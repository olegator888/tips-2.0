import { io } from "socket.io-client";

export const socket = io("http://localhost:5000");

export const socketEmit = (event: string, ...args: any[]) => {
  return new Promise((resolve, reject) => {
    socket.emit(
      event,
      ...[
        ...args,
        (response: { success: boolean; error?: string }) => {
          if (response.success) resolve(response);
          else reject(response.error);
        },
      ]
    );
  });
};
