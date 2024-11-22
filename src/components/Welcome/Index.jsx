import { useEffect, useState } from "react";

const Welcome = () => {
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );

  useEffect(() => {
    const getFirstAndSecondNames = () => {
      const names = username.split(" ");
      if (names.length == 2) {
        setUsername(`${names[0]} ${names[1]}`);
      }
    };

    getFirstAndSecondNames();
  });

  return (
    <>
      {username && (
        <div className="flex justify-end px-4 py-2 font-sans font-bold">
          <p>{`Hi, ${username}!`}</p>
        </div>
      )}
    </>
  );
};

export default Welcome;
