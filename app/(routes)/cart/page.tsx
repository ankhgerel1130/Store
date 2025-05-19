"use client";

import Container from "@/components/ui/container";
import useCart from "@/hooks/use-cart";
import CartItem from "./components/cart-item";
import Summary from "./components/summary";

const CartPage = () => {
  const cart = useCart();

  return (
    <div className="bg-gray-50">
      <Container>
        <div className="px-6 py-20 sm:px-8 lg:px-12">
          <h1 className="text-4xl font-light tracking-widest text-neutral-900 uppercase border-b border-neutral-200/30 pb-4">
            Shopping Cart
          </h1>
          <div className="mt-16 lg:grid lg:grid-cols-12 lg:items-start gap-x-16">
            <div className="lg:col-span-7">
              {cart.items.length === 0 && (
                <p className="text-sm font-light text-neutral-500 tracking-wide">
                  Your cart is empty.
                </p>
              )}
              <ul className="divide-y divide-neutral-200/50">
                {cart.items.map((item) => (
                  <li
                    key={item.id}
                    className="py-6 transition-shadow duration-300 hover:shadow-md"
                  >
                    <CartItem data={item} />
                  </li>
                ))}
              </ul>
            </div>
            <Summary />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CartPage;