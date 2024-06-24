import { Button } from "@mui/material";

function DiscountPanel({ coupan, setCoupan }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "0.5rem",
        marginBottom: "0.5rem",
      }}
    >
      <input
        type="text"
        placeholder="Discount Code"
        value={coupan}
        onChange={(event) => setCoupan(event.target.value)}
        style={{
          // marginTop: "0.7rem",
          padding: "0.8rem",
          border: "1px solid lightgray",
          borderRadius: "0.5rem",
          fontSize: "0.9rem",
          fontFamily: "Satoshi, sans-serif",
          flex: 1,
        }}
      />
      <Button
        disabled={coupan == ""}
        variant="outlined"
        color="secondary"
        style={{
          fontSize: "0.9rem",
          fontFamily: "Satoshi, sans-serif",
        }}
      >
        Apply
      </Button>
    </div>
  );
}

export default DiscountPanel;
