import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineCloseCircle } from "react-icons/ai";

function AddBankModel({
  setIsModal,
  getBanks,
  isEdit,
  selectedBank,
  setSelectedBank,
}) {
  const [name, setName] = useState("");
  const [branch, setBranch] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  const addBank = async (e) => {
    const user = localStorage.getItem("user");
    if (isEdit) {
      e.preventDefault();
      try {
        await axios.put(
          `http://localhost:5000/bank/${selectedBank._id}`,
          {
            name: name,
            branch: branch,
            location: location,
            phone: phone,
            address: address,
            accountNumber: accountNumber,
          },
          {
            headers: {
              Authorization: `Bearer ${user}`,
            },
          }
        );
        setName("");
        setBranch("");
        setLocation("");
        setPhone("");
        setAddress("");
        setAccountNumber("");
        setIsModal(false);
        setSelectedBank(null);
        getBanks();
      } catch (error) {
        console.log(error);
      }
    } else {
      e.preventDefault();
      try {
        await axios.post(
          "http://localhost:5000/banks",
          {
            name: name,
            branch: branch,
            location: location,
            phone: phone,
            address: address,
            accountNumber: accountNumber,
          },
          {
            headers: {
              Authorization: `Bearer ${user}`,
            },
          }
        );
        setName("");
        setBranch("");
        setLocation("");
        setAddress("");
        setPhone("");
        setAccountNumber("");
        setIsModal(false);
        setSelectedBank(null);
        getBanks();
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (isEdit) {
      setName(selectedBank.name);
      setBranch(selectedBank.branch);
      setLocation(selectedBank.location);
      setPhone(selectedBank.phone);
      setAddress(selectedBank.address);
      setAccountNumber(selectedBank.accountNumber);
    }
    console.log(selectedBank);
  }, [isEdit, selectedBank]);
  console.log(branch);

  return (
    <section className="model">
      <div className="addBankModel">
        <span onClick={() => setIsModal(false)} className="closeBtn">
          <AiOutlineCloseCircle />
        </span>
        <form className="addBankForm">
          <h3>Create Account</h3>
          <input
            type="name"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="branch"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
          />
          <input
            type="location"
            autoComplete="section-blue shipping address-level2"
            placeholder="bank location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <input
            type="tel"
            placeholder="phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="location"
            autoComplete="section-blue shipping street-address"
            placeholder="bank address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            type="number"
            placeholder="account number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
          />
          <button type="submit" onClick={addBank}>
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}

export default AddBankModel;
