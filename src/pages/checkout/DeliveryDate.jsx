import dayjs from "dayjs";

export function DeliveryDate({ deliveryDate }) {
  return (
    <div className="delivery-date">
      Delivery date:{" "}
      {dayjs(deliveryDate?.estimatedDeliveryTimeMs).format("dddd, MMMM, D")}
    </div>
  );
}
