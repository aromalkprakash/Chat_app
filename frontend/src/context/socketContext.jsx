import React, { createContext, useState, useEffect, useContext } from "react";
import { useQueryClient } from "@tanstack/react-query";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
	const queryClient = useQueryClient();
	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const authUser = queryClient.getQueryData(['authUser']); // Ensure this is the correct way to get authUser

	useEffect(() => {
		queryClient.invalidateQueries({ queryKey: ['authUser'] });

		if (authUser) {
			const newSocket = io("http://localhost:5000", {
				query: {
					userId: authUser._id,
				},
			});

			setSocket(socket);

			// socket.on("getOnlineUsers", (users) => {
			// 	setOnlineUsers(users);
			// });

			// return () => socket.close();
		} else {
			if (socket) {
				socket.close();
				setSocket(null);
			}
		}
	}, [authUser]);

	return (
		<SocketContext.Provider value={{ socket, onlineUsers }}>
			{children}
		</SocketContext.Provider>
	);
};
