export interface WebsocketMessage<Event, Data> {
  event: Event;
  data: Data;
}

export enum WebsocketEvent {
  CREATE_ROOM = "CREATE_ROOM",
  JOIN_ROOM = "JOIN_ROOM",
  LEAVE_ROOM = "LEAVE_ROOM",
  ROOM_INFO = "ROOM_INFO",
}
