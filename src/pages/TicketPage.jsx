import React, { useContext, useEffect, useState } from "react";
import Ticket from "../components/Dashboard/Ticket";
import { AuthContext } from "../context/AuthContext";
import Spinner from "../components/Spinner";

const TicketPage = () => {
  const { user } = useContext(AuthContext);
  const [tickets, setTickets] = useState([]);
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      const response = await fetch(
        `https://collections-management-server.onrender.com/user/tickets?email=${user.email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(false);

      if (!response.ok) {
        throw new Error("Failed to fetch tickets");
      }
      const data = await response.json();
      setDomain(data.domain);
      setTickets(data.result);
    };

    fetchCollections();
  }, [user.email]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <Ticket tickets={tickets} domain={domain} />
    </div>
  );
};

export default TicketPage;
