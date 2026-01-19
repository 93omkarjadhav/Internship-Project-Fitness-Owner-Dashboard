// import React from "react";
// import { useNavigate } from "react-router-dom";
// import adminApi from "../api/adminApi"; // ✨ Import Admin API

// interface Account {
//   id: number;
//   name: string;
//   role: string;
//   email: string;
//   image: string;
// }

// const accounts: Account[] = [
//   {
//     id: 1,
//     name: "Bertha Valdez",
//     role: "Owner",
//     email: "loraine.koelpin@fitfare.in",
//     image: "/Image (1).png",
//   },
//   {
//     id: 2,
//     name: "Harriett Payne",
//     role: "Region1",
//     email: "harriettpayne@fitfare.in",
//     image: "/Image.png",
//   },
//   {
//     id: 3,
//     name: "George Bryant",
//     role: "Region2",
//     email: "georgebryant@fitfare.in",
//     image: "/Oval.png",
//   },
// ];

// const AccountSelection: React.FC = () => {
//   const navigate = useNavigate();

// const handleAccountClick = (account: Account) => {
//   navigate("/entercredentials", { state: { email: account.email } });
// };



//   const handleBack = () => {
//     navigate("/");
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-[#4880FF] p-4">
//       <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-6 md:p-10">
//         <h2 className="text-center text-xl md:text-2xl font-semibold mb-8">
//           Choose an account
//         </h2>

//         {/* 🔹 ACCOUNTS GRID */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 place-items-center">
//           {accounts.map((account) => (
//             <div
//               key={account.id}
//               onClick={() => handleAccountClick(account)}
//               className="bg-white rounded-xl shadow-md p-6 w-full max-w-[230px] hover:shadow-xl transition-all duration-300 cursor-pointer text-center border border-[#D8D8D8] hover:border-blue-500"
//             >
//               <img
//                 src={account.image}
//                 alt={account.name}
//                 className="w-20 h-20 mx-auto mb-4 rounded-full shadow-sm object-cover"
//               />
//               <h3 className="font-semibold text-lg">{account.name}</h3>
//               <p className="text-sm text-gray-600">{account.role}</p>
//               <p className="text-xs text-gray-500 mt-1">{account.email}</p>
//             </div>
//           ))}
//         </div>

//         {/* 🔹 BACK BUTTON */}
//         <div className="flex justify-center mt-10">
//           <button
//             onClick={handleBack}
//             className="bg-[#4880FF] text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-all text-sm md:text-base w-[280px] font-semibold"
//           >
//             Back to Login
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AccountSelection;

//222222222222222
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import adminApi from "../api/adminApi"; // ✨ Import Admin API

// interface Account {
//   id: number;
//   full_name: string; // Matched DB column name
//   role: string;
//   email: string;
//   avatar_url?: string; // Matched DB column name
// }

// const AccountSelection: React.FC = () => {
//   const navigate = useNavigate();
//   const [accounts, setAccounts] = useState<Account[]>([]);
//   const [loading, setLoading] = useState(true);

//   // ✨ Fetch Real Accounts
//   useEffect(() => {
//     adminApi.get("/auth/accounts")
//       .then((res) => {
//         setAccounts(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Failed to load accounts", err);
//         setLoading(false);
//       });
//   }, []);

//   const handleAccountClick = (account: Account) => {
//     navigate("/entercredentials", { state: { email: account.email } });
//   };

//   const handleBack = () => {
//     navigate("/");
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-[#4880FF] p-4">
//       <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-6 md:p-10">
//         <h2 className="text-center text-xl md:text-2xl font-semibold mb-8">
//           Choose an account
//         </h2>

//         {/* 🔹 ACCOUNTS GRID */}
//         {loading ? (
//             <p className="text-center text-gray-500">Loading accounts...</p>
//         ) : (
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 place-items-center">
//             {accounts.map((account) => (
//                 <div
//                 key={account.id}
//                 onClick={() => handleAccountClick(account)}
//                 className="bg-white rounded-xl shadow-md p-6 w-full max-w-[230px] hover:shadow-xl transition-all duration-300 cursor-pointer text-center border border-[#D8D8D8] hover:border-blue-500"
//                 >
//                 <img
//                     src={account.avatar_url || "/Image (1).png"} // Fallback image
//                     alt={account.full_name}
//                     className="w-20 h-20 mx-auto mb-4 rounded-full shadow-sm object-cover"
//                 />
//                 <h3 className="font-semibold text-lg">{account.full_name}</h3>
//                 <p className="text-sm text-gray-600">{account.role}</p>
//                 <p className="text-xs text-gray-500 mt-1">{account.email}</p>
//                 </div>
//             ))}
//             </div>
//         )}

//         {/* 🔹 BACK BUTTON */}
//         <div className="flex justify-center mt-10">
//           <button
//             onClick={handleBack}
//             className="bg-[#4880FF] text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-all text-sm md:text-base w-[280px] font-semibold"
//           >
//             Back to Login
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AccountSelection;

//33333333333333
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import adminApi from "../api/adminApi"; 

// interface Account {
//   id: number;
//   full_name: string;
//   role: string;
//   email: string;
//   avatar_url?: string;
// }

// const AccountSelection: React.FC = () => {
//   const navigate = useNavigate();
//   const [accounts, setAccounts] = useState<Account[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // ✨ Fetch Real Accounts
//   useEffect(() => {
//     adminApi.get("/auth/accounts")
//       .then((res) => {
//         setAccounts(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Failed to load accounts", err);
//         setError("Failed to load accounts.");
//         setLoading(false);
//       });
//   }, []);

//   const handleAccountClick = (account: Account) => {
//     // ✨ Pass the email to the next page
//     navigate("/entercredentials", { state: { email: account.email } });
//   };

//   const handleBack = () => {
//     navigate("/");
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-[#4880FF] p-4">
//       <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-6 md:p-10">
//         <h2 className="text-center text-xl md:text-2xl font-semibold mb-8">
//           Choose an account
//         </h2>

//         {loading ? (
//            <p className="text-center text-gray-500">Loading accounts...</p>
//         ) : error ? (
//            <p className="text-center text-red-500">{error}</p>
//         ) : (
//            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 place-items-center">
//             {accounts.map((account) => (
//               <div
//                 key={account.id}
//                 onClick={() => handleAccountClick(account)}
//                 className="bg-white rounded-xl shadow-md p-6 w-full max-w-[230px] hover:shadow-xl transition-all duration-300 cursor-pointer text-center border border-[#D8D8D8] hover:border-blue-500"
//               >
//                 <img
//                   src={account.avatar_url || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} 
//                   alt={account.full_name}
//                   className="w-20 h-20 mx-auto mb-4 rounded-full shadow-sm object-cover"
//                 />
//                 <h3 className="font-semibold text-lg truncate">{account.full_name}</h3>
//                 <p className="text-sm text-gray-600">{account.role}</p>
//                 <p className="text-xs text-gray-500 mt-1 truncate">{account.email}</p>
//               </div>
//             ))}
//            </div>
//         )}

//         <div className="flex justify-center mt-10">
//           <button
//             onClick={handleBack}
//             className="bg-[#4880FF] text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-all text-sm md:text-base w-[280px] font-semibold"
//           >
//             Back to Login
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AccountSelection;

//444444
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import adminApi from "../api/adminApi"; 

interface Account {
  id: number;
  full_name: string;
  role: string;
  email: string;
  avatar_url?: string;
}

const AccountSelection: React.FC = () => {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    adminApi.get("/auth/accounts")
      .then((res) => {
        setAccounts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load accounts", err);
        setError("Failed to load accounts.");
        setLoading(false);
      });
  }, []);

  const handleAccountClick = (account: Account) => {
    // 1. SAVE to Session Storage (Backup for refresh)
    sessionStorage.setItem("selected_account_email", account.email);
    
    // 2. NAVIGATE with State (Primary method)
    navigate("/entercredentials", { state: { email: account.email } });
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#4880FF] p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-6 md:p-10">
        <h2 className="text-center text-xl md:text-2xl font-semibold mb-8">
          Choose an account
        </h2>

        {loading ? (
           <p className="text-center text-gray-500">Loading accounts...</p>
        ) : error ? (
           <p className="text-center text-red-500">{error}</p>
        ) : (
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 place-items-center">
            {accounts.map((account) => (
              <div
                key={account.id}
                onClick={() => handleAccountClick(account)}
                className="bg-white rounded-xl shadow-md p-6 w-full max-w-[230px] hover:shadow-xl transition-all duration-300 cursor-pointer text-center border border-[#D8D8D8] hover:border-blue-500"
              >
                <img
                  src={account.avatar_url || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} 
                  alt={account.full_name}
                  className="w-20 h-20 mx-auto mb-4 rounded-full shadow-sm object-cover"
                />
                <h3 className="font-semibold text-lg truncate">{account.full_name}</h3>
                <p className="text-sm text-gray-600">{account.role}</p>
                <p className="text-xs text-gray-500 mt-1 truncate">{account.email}</p>
              </div>
            ))}
           </div>
        )}

        <div className="flex justify-center mt-10">
          <button
            onClick={handleBack}
            className="bg-[#4880FF] text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-all text-sm md:text-base w-[280px] font-semibold"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountSelection;