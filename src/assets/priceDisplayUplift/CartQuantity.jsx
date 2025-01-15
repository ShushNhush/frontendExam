import { BasicButton } from "../templateStyles";
const CartQuantity = ({ quantity, onQuantityChange }) => {
    return (
      <div className="flex items-center space-x-2" >
        <BasicButton 
          onClick={() => onQuantityChange(Math.max(0, quantity - 1))}
          className="px-3 py-1 bg-gray-200 rounded"
        >
          -
        </BasicButton>
        <span className="w-12 text-center" style={{margin: "10px", fontSize: "24px"}}>{quantity}</span>
        <BasicButton 
          onClick={() => onQuantityChange(quantity + 1)}
          className="px-3 py-1 bg-gray-200 rounded"
        >
          +
        </BasicButton>
      </div>
    );
  };

  export default CartQuantity;