import { atom, selector } from "recoil";

export const notifications = atom({
    key: "networkAtom",
    default: []
});

export const totalNotificationSelector = selector({
    key: "totalNotificationSelector",
    get: ({get}) => {
        const allNotifications = get(notifications);
        return allNotifications.length;
    }
});

export const completedTodosSelector = selector({
    key: "completedTodosSelector",
    get: ({get}) => {
        const allNotifications = get(notifications);
        return allNotifications.filter(todo => todo.completed);
    }
});

export const pendingTodosSelector = selector({
    key: "pendingTodosSelector", 
    get: ({get}) => {
        const allNotifications = get(notifications);
        return allNotifications.filter(todo => !todo.completed);
    }
});