/* eslint-disable react/jsx-key */

import { HiOutlineStar } from "react-icons/hi";

/* eslint-disable react/prop-types */
const CurrencyDropdown = ({
  currencies,
  currency,
  setCurrency,
  favorites,
  favHandler,
  title = "",
}) => {
  return (
    <div className="mt-2">
      <label className=" text-gray-800 " htmlFor={title}>
        {title}
      </label>
      <div className=" relative">
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full p-2 border border-gray-400 focus:outline-none focus:ring-2 rounded-md shadow-md focus:ring-indigo-500"
          name="currencies"
        >
          <hr />
          {currencies?.map((data) => {
            return (
              <option value={data} key={data}>
                {data}
              </option>
            );
          })}
        </select>
        <button
          onClick={() => favHandler(currency)}
          className=" absolute insert-y-0 right-0 bottom-0 top-0 pr-5 flex items-center text-sm leading-5"
          type="button"
        >
          <HiOutlineStar />
        </button>
      </div>
    </div>
  );
};

export default CurrencyDropdown;
