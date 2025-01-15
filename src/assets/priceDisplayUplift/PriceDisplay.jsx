const PriceDisplay = ({ quantity, pricePerUnit }) => {
    const subtotal = quantity * pricePerUnit;
    return (
      <div className="text-lg">
        Subtotal: ${subtotal.toFixed(2)}
      </div>
    );
  };
export default PriceDisplay;  