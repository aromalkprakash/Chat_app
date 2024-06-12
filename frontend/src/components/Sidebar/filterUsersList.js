import { useSelector } from "react-redux";

export const filteredUsersList = (state) => {
    const { usersList, searchQuery } = useSelector(state => state.conversations);
    if (!searchQuery) return usersList;
    return usersList.filter(user => user.fullName.toLowerCase().includes(searchQuery.toLowerCase()));
};
  