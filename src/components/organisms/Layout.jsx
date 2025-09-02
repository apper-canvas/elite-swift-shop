import { useCart } from "@/hooks/useCart";
import React, { useState } from "react";
import Header from "@/components/organisms/Header";
import CartDrawer from "@/components/organisms/CartDrawer";

const Layout = ({ children }) => {
  const {
    cartItems,
    isCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    getItemCount,
    openCart,
    closeCart
  } = useCart();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
    console.log("Searching for:", query);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        cartItemCount={getItemCount()}
        onCartClick={openCart}
        onSearch={handleSearch}
      />
      <main className="flex-1">
{React.cloneElement(children, { 
          searchQuery, 
          selectedCategory,
          onAddToCart: addToCart 
        })}
        
        {/* Logout Button */}
        <div className="fixed bottom-4 right-4 z-50">
          <button
            onClick={async () => {
              try {
                const { ApperUI } = window.ApperSDK;
                await ApperUI.logout();
                window.location.href = '/login';
              } catch (error) {
                console.error("Logout failed:", error);
              }
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg transition-colors duration-200"
          >
            Logout
          </button>
        </div>
      </main>
      
      <CartDrawer
        isOpen={isCartOpen}
        onClose={closeCart}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        total={getCartTotal()}
      />
    </div>
  );
};

export default Layout;