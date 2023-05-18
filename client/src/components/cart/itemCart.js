import React from "react";

const Item = (props) => {
  const i = props.item;
  const newprice = props.newprice;
  const handlDelete = props.handlDelete();
  const handleUpdate = props.handleUpdate();
  const formatter = props.formatter;
  return (
    <div>
      <div key={i.id} className="px-5 my-1 bg-slate-100 h-32">
        <div className="flex flex-col text-slate-800">
          <p>{i.name}</p>
          <div className="flex">
            <img src={i.img} alt="" className="w-10" />
            <input
              type="number"
              min="1"
              max="10"
              value={i.quantity}
              onChange={(e) => handleUpdate(e, i.id)}
              className="w-12 h-8 px-1 border"
            />
          </div>
          <p>{formatter.format(newprice)}</p>
        </div>
        <button
          onClick={() => handlDelete(i.id)}
          className="text-red-500 hover:text-red-400"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Item;
