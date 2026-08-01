import { useEffect } from "react";
import socket from "./socket/socket";

function App() {

    useEffect(() => {

        const userId = "6a6ce101028fc4aebdd0de14";

        socket.connect();

        socket.emit("join", userId);

        socket.on("newNotification", (notification) => {

            alert(notification.message);

            console.log(notification);

        });

        return () => {

            socket.off("newNotification");

            socket.disconnect();

        };

    }, []);

    return (

        <div>

            <h1>CRM Notification System</h1>

        </div>

    );

}

export default App;