import { Badge, Typography } from "@mui/material";

function ProductDisplayCard({ product, index }) {
  return (
    <div
      key={index}
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "1.5rem",
        justifyContent: "space-between",
        padding: "0.5rem",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "0.9rem",
        }}
      >
        <Badge badgeContent={product.count} color="primary">
          <div>
            <img
              style={{
                objectFit: "contain",
                height: "70px",
                width: "80px",
                padding: "0.2rem",
                border: "1px solid lightgray",
              }}
              loading="lazy"
              src={product?.image?.src}
            />
          </div>
        </Badge>
        <Typography
          textAlign="left"
          fontFamily="Satoshi, sans-serif"
          fontSize="0.95rem"
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          {product.title}
        </Typography>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Typography
          display="flex"
          flexDirection="column"
          justifyContent="center"
          textAlign="center"
          fontFamily="Satoshi, sans-serif"
          fontSize="0.95rem"
        >
          {"$ " + product.variants[0].price}
        </Typography>
      </div>
    </div>
  );
}

export default ProductDisplayCard;
