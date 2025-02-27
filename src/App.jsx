import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(6);
  const [numAllowed, setNumAllowed] = useState(true);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 0; i < length; i++) {
      const random = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(random);
    }
    setPassword(pass);
  }, [length, numAllowed, charAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numAllowed, charAllowed, passwordGenerator]);

  const passwordRef = useRef(null);
  const copyToClip = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionInRange(0, 20);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-white">
      <h2 className="text-white text-center my-3">Random Password Generator</h2>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none text-black bg-amber-50 w-full py-1 px-3 "
          placeholder="Password"
          ref={passwordRef}
          readOnly
        />
        <button
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
          onClick={copyToClip}
        >
          Copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={20}
            value={length}
            className="cursor-pointer"
            onChange={(e) => setLength(e.target.value)}
            
          />
          <label>LENGTH = {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numAllowed}
            id="numberInput"
            onChange={() => {
              setNumAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="characterInput"
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
