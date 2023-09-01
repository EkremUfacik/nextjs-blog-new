const UserStatus = () => {
  const [userStatus, setUserStatus] = useState("");

  useEffect(() => {
    getUserStatus();
  }, []);

  const getUserStatus = async () => {
    const res = await fetcher("auth/status");
    setUserStatus(res.status);
  };

  const handleStatus = async (e) => {
    e.preventDefault();
    const status = e.target.status.value;
    try {
      const res = await axios.patch(
        "https://blog-api-eu.onrender.com/auth/status",
        { status },
        {
          withCredentials: true,
        }
      );
      setUserStatus(res.data.status);
      toast({
        title: "Success",
        description: "Status updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.response.data.message,
      });
    }
  };

  return (
    <form className="text-center" onSubmit={handleStatus}>
      <input
        className="outline-none border py-2 ps-4 me-4 focus:shadow-lg font-medium"
        type="text"
        name="status"
        id="status"
        defaultValue={userStatus}
        placeholder="Your Status"
      />
      <button className="px-4 py-2 hover:bg-indigo-300 hover:text-indigo-700 transition-all rounded font-medium">
        UPDATE
      </button>
    </form>
  );
};

export default UserStatus;
