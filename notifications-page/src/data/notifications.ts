const now = Date.now();

export const notifications = [
  {
    type: "reacted" as const,
    isRead: false,
    user: {
      name: "Mark Webber",
      avatar: "/assets/images/avatar-mark-webber.webp",
    },
    time: {
      datetime: new Date(now - 1000 * 60).toISOString(),
      formatted: "1m ago",
    },
    post: "My first tournament today",
  },
  {
    type: "followed" as const,
    isRead: false,
    user: {
      name: "Angela Gray",
      avatar: "/assets/images/avatar-angela-gray.webp",
    },
    time: {
      datetime: new Date(now - 1000 * 60 * 5).toISOString(),
      formatted: "5m ago",
    },
  },
  {
    type: "joined" as const,
    isRead: false,
    user: {
      name: "Jacob Thompson",
      avatar: "/assets/images/avatar-jacob-thompson.webp",
    },
    time: {
      datetime: new Date(now - 1000 * 60 * 60 * 24).toISOString(),
      formatted: "1 day ago",
    },
    group: "Chess Club",
  },
  {
    type: "messaged" as const,
    isRead: true,
    user: {
      name: "Rizky Hasanuddin",
      avatar: "/assets/images/avatar-rizky-hasanuddin.webp",
    },
    time: {
      datetime: new Date(now - 1000 * 60 * 60 * 24 * 5).toISOString(),
      formatted: "5 days ago",
    },
    message:
      "Hello, thanks for setting up the Chess Club. I've been a member for a few weeks now and I'm already having lots of fun and improving my game.",
  },
  {
    type: "commented" as const,
    isRead: true,
    user: {
      name: "Kimberly Smith",
      avatar: "/assets/images/avatar-kimberly-smith.webp",
    },
    time: {
      datetime: new Date(now - 1000 * 60 * 60 * 24 * 7).toISOString(),
      formatted: "1 week ago",
    },
    picture: "/assets/images/image-chess.webp",
  },
  {
    type: "reacted" as const,
    isRead: true,
    user: {
      name: "Nathan Peterson",
      avatar: "/assets/images/avatar-nathan-peterson.webp",
    },
    time: {
      datetime: new Date(now - 1000 * 60 * 60 * 24 * 7 * 2).toISOString(),
      formatted: "2 weeks ago",
    },
    post: "5 end-game strategies to increase your win rate",
  },
  {
    type: "left" as const,
    isRead: true,
    user: {
      name: "Anna Kim",
      avatar: "/assets/images/avatar-anna-kim.webp",
    },
    time: {
      datetime: new Date(now - 1000 * 60 * 60 * 24 * 7 * 2).toISOString(),
      formatted: "2 weeks ago",
    },
    group: "Chess Club",
  },
];
