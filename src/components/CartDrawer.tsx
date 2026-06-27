import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Tag, Percent, ArrowRight, Sparkles, Check, Clipboard, Calendar, RefreshCw, MessageSquare } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: CartDrawerProps) {
  const [promoCode, setPromoCode] = useState('');
  const [activeDiscount, setActiveDiscount] = useState<{ code: string; type: 'percentage' | 'shipping'; amount: number } | null>(null);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'review' | 'loading' | 'success'>('review');
  const [shippingAddress, setShippingAddress] = useState({ name: '', email: '', street: '', city: '' });
  const [formError, setFormError] = useState('');

  const shippingCost = activeDiscount?.type === 'shipping' ? 0.00 : 4.99;
  const itemsSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  
  let discountAmount = 0;
  if (activeDiscount?.type === 'percentage') {
    discountAmount = itemsSubtotal * activeDiscount.amount;
  }
  const orderTotal = Math.max(0, itemsSubtotal - discountAmount + (itemsSubtotal > 0 ? shippingCost : 0));

  const handleApplyPromo = () => {
    setPromoError('');
    setPromoSuccess('');
    const code = promoCode.trim().toUpperCase();

    if (code === 'ELIXIRNEW') {
      setActiveDiscount({ code: 'ELIXIRNEW', type: 'percentage', amount: 0.15 });
      setPromoSuccess('Promo applied: 15% off entire order!');
    } else if (code === 'PUREHYDRO') {
      setActiveDiscount({ code: 'PUREHYDRO', type: 'shipping', amount: 4.99 });
      setPromoSuccess('Promo applied: Free express shipping!');
    } else {
      setPromoError('Invalid coupon code. Try ELIXIRNEW or PUREHYDRO.');
    }
  };

  const handleStartCheckout = () => {
    if (cart.length === 0) return;
    setCheckoutStep('review');
    setIsCheckingOut(true);
  };

  const handleCompleteOrder = (e: FormEvent) => {
    e.preventDefault();
    if (!shippingAddress.name || !shippingAddress.email || !shippingAddress.street || !shippingAddress.city) {
      setFormError('Please fill out all shipping fields.');
      return;
    }
    setFormError('');
    setCheckoutStep('loading');
    setTimeout(() => {
      setCheckoutStep('success');
    }, 2500);
  };

  const closeReceipt = () => {
    onClearCart();
    setIsCheckingOut(false);
    onClose();
    setCheckoutStep('review');
    setActiveDiscount(null);
    setPromoCode('');
    setShippingAddress({ name: '', email: '', street: '', city: '' });
  };

  const handleWhatsAppOrder = () => {
    const itemsText = cart.map(item => `- ${item.name} x${item.quantity} ($${(item.price * item.quantity).toFixed(2)})`).join('\n');
    const promoText = activeDiscount ? `\nPromo Code Applied: ${activeDiscount.code} (-$${discountAmount.toFixed(2)})` : '';
    const shippingText = shippingAddress.name ? `\n\nShipping Details:\n- Name: ${shippingAddress.name}\n- Email: ${shippingAddress.email}\n- Address: ${shippingAddress.street}, ${shippingAddress.city}` : '';
    const message = `Hello Elixir! I would like to place an order:

${itemsText}
${promoText}${shippingText}
Estimated Total: $${orderTotal.toFixed(2)}

Please let me know how to pay. Thanks!`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/916297480798?text=${encodedMessage}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-50 cursor-pointer"
          />

          {/* Drawer Slide */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-[[-6px_0px_0px_0px_rgba(0,0,0,1)]] z-50 flex flex-col justify-between text-left border-l-2 border-black"
          >
            {/* Header */}
            <div className="p-6 border-b-2 border-black flex items-center justify-between bg-white">
              <div>
                <h3 className="font-display font-black text-black text-xl uppercase tracking-tight">Your Hydration Plan</h3>
                <p className="text-xs font-mono font-bold text-neutral-400 uppercase mt-0.5">Review selected blends and cases</p>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 border-2 border-black bg-white hover:bg-neutral-100 text-black rounded-none transition-all cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                <X className="w-4 h-4 stroke-[2.5px]" />
              </button>
            </div>

            {/* MAIN CONTENT AREA */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white">
              
              {!isCheckingOut ? (
                <>
                  {cart.length === 0 ? (
                    <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
                      <div className="p-4 bg-white border-2 border-black rounded-none text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <ArrowRight className="w-8 h-8 rotate-45" />
                      </div>
                      <div>
                        <h4 className="font-display font-black text-black text-sm uppercase tracking-tight">Your Plan is Empty</h4>
                        <p className="text-xs text-neutral-500 mt-1 max-w-[220px] font-medium leading-relaxed">Choose from our collections or design custom bottles in the laboratory.</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cart.map((item) => (
                        <div key={item.id} className="p-4 bg-white rounded-none border-2 border-black flex gap-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                          <div className="w-16 h-16 rounded-none border border-black overflow-hidden bg-neutral-100 flex-shrink-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div className="flex-1 min-w-0 flex flex-col justify-between text-left">
                            <div>
                              <h4 className="font-display font-black text-xs text-black uppercase tracking-tight truncate">{item.name}</h4>
                              
                              {/* Custom Attributes indicators */}
                              {(item.vesselType || item.infusion || item.engraving) && (
                                <div className="mt-1 space-y-0.5">
                                  {item.vesselType && (
                                    <span className="text-[10px] font-mono text-neutral-500 font-bold block truncate">VESSEL: {item.vesselType.toUpperCase()}</span>
                                  )}
                                  {item.infusion && (
                                    <span className="text-[10px] font-mono text-emerald-700 block font-black uppercase truncate">INFUSE: {item.infusion.toUpperCase()}</span>
                                  )}
                                  {item.engraving && (
                                    <span className="text-[10px] text-cyan-600 font-black block tracking-wider uppercase">LASER: "{item.engraving.toUpperCase()}"</span>
                                  )}
                                </div>
                              )}
                            </div>

                            <div className="flex items-center justify-between mt-2 pt-2 border-t-2 border-neutral-100">
                              <span className="font-mono text-xs font-black text-black">${(item.price * item.quantity).toFixed(2)}</span>
                              
                              {/* Quantity controls */}
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => onUpdateQuantity(item.id, -1)}
                                  className="w-5 h-5 bg-white border border-black rounded-none text-black font-black flex items-center justify-center text-xs hover:bg-neutral-50 cursor-pointer shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                                >
                                  -
                                </button>
                                <span className="font-mono text-xs font-black text-black w-4 text-center">{item.quantity}</span>
                                <button
                                  onClick={() => onUpdateQuantity(item.id, 1)}
                                  className="w-5 h-5 bg-white border border-black rounded-none text-black font-black flex items-center justify-center text-xs hover:bg-neutral-50 cursor-pointer shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                                >
                                  +
                                </button>
                                <button
                                  onClick={() => onRemoveItem(item.id)}
                                  className="ml-2 text-neutral-400 hover:text-black transition-colors cursor-pointer"
                                  title="Delete Item"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Promo Coupons */}
                  {cart.length > 0 && (
                    <div className="p-4 bg-[#FAFAFA] border-2 border-black rounded-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                      <h4 className="font-mono text-[10px] text-black font-black uppercase tracking-widest mb-2 flex items-center gap-1">
                        <Tag className="w-3 h-3" /> AVAILABLE COUPONS
                      </h4>
                      <div className="grid grid-cols-2 gap-2 text-left mb-3">
                        <button
                          onClick={() => setPromoCode('ELIXIRNEW')}
                          className="p-2 border border-dashed border-black hover:bg-white bg-transparent rounded-none text-left cursor-pointer"
                        >
                          <span className="font-mono text-[10px] font-black text-black block">ELIXIRNEW</span>
                          <span className="text-[9px] font-sans text-neutral-500 font-medium block">15% off whole order</span>
                        </button>
                        <button
                          onClick={() => setPromoCode('PUREHYDRO')}
                          className="p-2 border border-dashed border-black hover:bg-white bg-transparent rounded-none text-left cursor-pointer"
                        >
                          <span className="font-mono text-[10px] font-black text-black block">PUREHYDRO</span>
                          <span className="text-[9px] font-sans text-neutral-500 font-medium block">Free express shipping</span>
                        </button>
                      </div>

                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          placeholder="ENTER PROMO"
                          className="flex-1 px-3 py-1.5 bg-white border-2 border-black rounded-none text-xs font-mono uppercase tracking-widest focus:outline-hidden text-black font-bold shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                        />
                        <button
                          onClick={handleApplyPromo}
                          className="px-4 py-1.5 bg-black text-white border-2 border-black rounded-none text-xs font-black font-display uppercase tracking-wider cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5"
                        >
                          Apply
                        </button>
                      </div>

                      {promoError && <p className="text-[10px] text-rose-600 font-mono font-bold mt-2">{promoError}</p>}
                      {promoSuccess && <p className="text-[10px] text-emerald-700 font-mono font-black mt-2 uppercase">{promoSuccess}</p>}
                    </div>
                  )}
                </>
              ) : (
                /* CHECKOUT PROGRESS PANELS */
                <div className="space-y-6 text-left">
                  {checkoutStep === 'review' && (
                    <form onSubmit={handleCompleteOrder} className="space-y-4">
                      <div className="p-4 bg-black border-2 border-black text-white rounded-none shadow-[4px_4px_0px_0px_rgba(6,182,212,1)]">
                        <span className="font-mono text-[9px] text-cyan-400 block font-black tracking-widest">TOTAL TO CHARGE</span>
                        <span className="font-display text-2xl font-black text-white mt-1 block">${orderTotal.toFixed(2)}</span>
                      </div>

                      <h4 className="font-display font-black text-black text-base uppercase tracking-tight">Secure Shipping Dispatch</h4>
                      
                      <div className="space-y-3">
                        <div>
                          <label className="text-[10px] font-mono text-black font-bold tracking-widest block mb-1">FULL NAME</label>
                          <input
                            type="text"
                            required
                            placeholder="John Doe"
                            value={shippingAddress.name}
                            onChange={(e) => setShippingAddress({...shippingAddress, name: e.target.value})}
                            className="w-full px-4 py-2.5 bg-[#FAFAFA] border-2 border-black rounded-none text-xs font-bold text-black focus:outline-hidden focus:ring-1 focus:ring-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-mono text-black font-bold tracking-widest block mb-1">EMAIL ADDRESS</label>
                          <input
                            type="email"
                            required
                            placeholder="john@example.com"
                            value={shippingAddress.email}
                            onChange={(e) => setShippingAddress({...shippingAddress, email: e.target.value})}
                            className="w-full px-4 py-2.5 bg-[#FAFAFA] border-2 border-black rounded-none text-xs font-bold text-black focus:outline-hidden focus:ring-1 focus:ring-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-mono text-black font-bold tracking-widest block mb-1">DELIVERY ADDRESS</label>
                          <input
                            type="text"
                            required
                            placeholder="742 Evergreen Terrace"
                            value={shippingAddress.street}
                            onChange={(e) => setShippingAddress({...shippingAddress, street: e.target.value})}
                            className="w-full px-4 py-2.5 bg-[#FAFAFA] border-2 border-black rounded-none text-xs font-bold text-black focus:outline-hidden focus:ring-1 focus:ring-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-mono text-black font-bold tracking-widest block mb-1">CITY / STATE</label>
                          <input
                            type="text"
                            required
                            placeholder="Springfield, OR"
                            value={shippingAddress.city}
                            onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                            className="w-full px-4 py-2.5 bg-[#FAFAFA] border-2 border-black rounded-none text-xs font-bold text-black focus:outline-hidden focus:ring-1 focus:ring-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                          />
                        </div>
                      </div>

                      {formError && <p className="text-[10px] text-rose-600 font-mono font-bold mt-2">{formError}</p>}

                      <button
                        type="submit"
                        className="w-full mt-6 py-4 bg-black text-white font-display text-xs font-black uppercase tracking-wider rounded-none border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        Authorize Payment & Dispatch
                      </button>

                      <button
                        type="button"
                        onClick={handleWhatsAppOrder}
                        className="w-full py-3.5 bg-emerald-500 text-white font-display text-xs font-black uppercase tracking-wider rounded-none border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <MessageSquare className="w-4 h-4 text-white fill-white" />
                        Order via WhatsApp directly
                      </button>

                      <button
                        type="button"
                        onClick={() => setCheckoutStep('review')}
                        className="w-full py-2.5 bg-white border-2 border-black text-black text-xs font-black font-mono uppercase tracking-wider rounded-none hover:bg-neutral-50 cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                        onClickCapture={() => setIsCheckingOut(false)}
                      >
                        Back to Cart review
                      </button>
                    </form>
                  )}

                  {checkoutStep === 'loading' && (
                    <div className="py-24 flex flex-col items-center justify-center text-center space-y-6">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                        className="p-4 bg-white text-black rounded-none border-2 border-black shadow-[4px_4px_0px_0px_rgba(6,182,212,1)]"
                      >
                        <RefreshCw className="w-8 h-8" />
                      </motion.div>
                      <div>
                        <h4 className="font-display font-black text-black text-base uppercase tracking-tight">Securing Mineral Reserves...</h4>
                        <p className="text-xs text-neutral-500 mt-1 max-w-[220px] mx-auto font-medium leading-relaxed">Connecting to Elixir volcanic dispatch channels to process safe packaging.</p>
                      </div>
                    </div>
                  )}

                  {checkoutStep === 'success' && (
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="py-6 flex flex-col space-y-6"
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className="p-3.5 bg-white text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(16,185,129,1)] mb-4 rounded-none">
                          <Check className="w-8 h-8 stroke-[3px]" />
                        </div>
                        <h3 className="font-display font-black text-black text-xl uppercase tracking-tight">Order Dispatched!</h3>
                        <p className="text-xs font-mono font-bold text-neutral-400 mt-1">Receipt ID: #ELX-{(Math.random() * 100000).toFixed(0)}</p>
                      </div>

                      {/* Reciept */}
                      <div className="p-6 bg-white border-2 border-black rounded-none font-mono text-[11px] text-black space-y-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <div className="flex items-center justify-between border-b-2 border-black pb-2">
                          <span className="font-black text-black uppercase">DELIVER TO:</span>
                          <span className="text-right truncate max-w-[150px] font-bold">{shippingAddress.name}</span>
                        </div>
                        
                        <div className="space-y-1 pb-3 border-b border-dashed border-neutral-300 text-left">
                          <span className="font-black text-neutral-400 uppercase tracking-widest block text-[9px] mb-1">HYDRATION CONTENT:</span>
                          {cart.map((item) => (
                            <div key={item.id} className="flex justify-between text-neutral-800 font-bold">
                              <span className="truncate max-w-[200px]">{item.name} x{item.quantity}</span>
                              <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                          ))}
                        </div>

                        <div className="space-y-1 pt-1 font-bold">
                          <div className="flex justify-between text-neutral-600">
                            <span>SUBTOTAL:</span>
                            <span>${itemsSubtotal.toFixed(2)}</span>
                          </div>
                          {discountAmount > 0 && (
                            <div className="flex justify-between text-emerald-600">
                              <span>PROMO DISCOUNT ({activeDiscount?.code}):</span>
                              <span>-${discountAmount.toFixed(2)}</span>
                            </div>
                          )}
                          <div className="flex justify-between text-neutral-600">
                            <span>EXPRESS SHIPPING:</span>
                            <span>{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
                          </div>
                          <div className="flex justify-between font-black text-black text-xs border-t-2 border-black pt-2 mt-2">
                            <span>TOTAL AUTHORIZED:</span>
                            <span>${orderTotal.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-white text-black text-[11px] font-sans rounded-none border-2 border-black leading-relaxed text-left flex gap-2.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                        <Calendar className="w-4 h-4 text-black flex-shrink-0" />
                        <p className="font-medium text-neutral-700">
                          <strong>Express Tracking:</strong> Your custom bottled water is scheduled for extraction at the subterranean source within 12 hours. Express logistics will deliver to <strong>{shippingAddress.city}</strong> in 2-3 business days.
                        </p>
                      </div>

                      <button
                        onClick={closeReceipt}
                        className="w-full py-4 bg-black text-white font-display text-xs font-black uppercase tracking-wider rounded-none border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
                      >
                        Return to Hydration Lab
                      </button>
                    </motion.div>
                  )}
                </div>
              )}

            </div>

            {/* Footer Summary Area */}
            {cart.length > 0 && checkoutStep === 'review' && !isCheckingOut && (
              <div className="p-6 border-t-2 border-black bg-[#FAFAFA] space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm text-neutral-600 font-sans font-medium">
                    <span>Subtotal</span>
                    <span className="font-mono font-black text-black">${itemsSubtotal.toFixed(2)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex items-center justify-between text-sm text-emerald-700 font-sans font-black uppercase">
                      <span>Promo Discount</span>
                      <span className="font-mono">-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-sm text-neutral-600 font-sans font-medium">
                    <span>Express Dispatch</span>
                    <span className="font-mono font-black text-black">{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
                  </div>
                  <div className="flex items-center justify-between font-display font-black text-black text-lg pt-2 border-t-2 border-black">
                    <span>Estimated Total</span>
                    <span className="font-mono">${orderTotal.toFixed(2)}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98, y: 1 }}
                    onClick={handleWhatsAppOrder}
                    className="py-4 bg-emerald-500 text-white font-display text-[10px] font-black uppercase tracking-wider rounded-none border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-white fill-white" />
                    WhatsApp Order
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98, y: 1 }}
                    onClick={handleStartCheckout}
                    className="py-4 bg-black text-white font-display text-[10px] font-black uppercase tracking-wider rounded-none border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    Proceed Online
                    <ArrowRight className="w-3.5 h-3.5 text-cyan-400 stroke-[3px]" />
                  </motion.button>
                </div>
              </div>
            )}

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
