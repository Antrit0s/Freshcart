// WishlistContext.js
import React, { createContext, useState, useContext } from "react";

export const WishlistContext = createContext();

export default function WishlistProvider({ children }) {
  const [addedToWishlist, setAddedToWishlist] = useState(false);

  return (
    <WishlistContext.Provider value={{ addedToWishlist, setAddedToWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}
