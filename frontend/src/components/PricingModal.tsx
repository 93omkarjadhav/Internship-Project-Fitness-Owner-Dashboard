import { useState } from "react";
import { X, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date | null;
  onConfirm: (price: string, customPrices: string[]) => void;
}

const PricingModal = ({ isOpen, onClose, selectedDate, onConfirm }: PricingModalProps) => {
  const [price, setPrice] = useState("");
  const [customPrices, setCustomPrices] = useState<string[]>([""]);

  if (!isOpen || !selectedDate) return null;

  const formatDateRange = (date: Date) => {
    const month = date.toLocaleString("en-US", { month: "short" });
    const day = date.getDate();
    const endDay = day + 2; // Example: showing 3-day range
    return `${month} ${day}-${endDay}`;
  };

  const addCustomPrice = () => {
    setCustomPrices([...customPrices, ""]);
  };

  const removeCustomPrice = (index: number) => {
    setCustomPrices(customPrices.filter((_, i) => i !== index));
  };

  const handleConfirm = () => {
    onConfirm(price, customPrices);
    setPrice("");
    setCustomPrices([""]);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-card rounded-2xl shadow-2xl w-full max-w-md animate-in fade-in zoom-in duration-200">
          {/* Header */}
          <div className="relative p-6 pb-4 border-b border-border">
            <h2 className="text-xl font-semibold text-center text-foreground">
              Set Pricing for {formatDateRange(selectedDate)}
            </h2>
            <button
              onClick={onClose}
              className="absolute right-4 top-4 w-8 h-8 flex items-center justify-center rounded-full bg-primary hover:bg-primary/90 transition-colors"
            >
              <X className="w-5 h-5 text-primary-foreground" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Set Price */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Set Price:
              </label>
              <Input
                type="text"
                placeholder="Enter your price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full"
              />
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-card px-4 text-sm text-muted-foreground">Or</span>
              </div>
            </div>

            {/* Custom Price/Time */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Custom Price/Time:
              </label>
              <div className="space-y-2">
                {customPrices.map((customPrice, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      type="text"
                      placeholder="Enter custom price"
                      value={customPrice}
                      onChange={(e) => {
                        const newPrices = [...customPrices];
                        newPrices[index] = e.target.value;
                        setCustomPrices(newPrices);
                      }}
                      className="flex-1"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => removeCustomPrice(index)}
                      disabled={customPrices.length === 1}
                      className="h-10 w-10"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    {index === customPrices.length - 1 && (
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={addCustomPrice}
                        className="h-10 w-10"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Confirm Button */}
            <Button
              onClick={handleConfirm}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-6 rounded-xl"
            >
              Confirm New Pricing
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PricingModal;