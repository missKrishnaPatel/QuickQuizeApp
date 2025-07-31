import { Box, Button, Stack } from "@mui/material";

const categories = ["All", "Programming", "React", "CSS", "Backend", "Python"];

export default function CategoryFilter({ selected, setSelected }) {
  return (
    <Stack
      direction="row"
      spacing={{ xs: 1, sm: 2 }} // Responsive spacing for horizontal gaps
      rowGap={{ xs: 3, sm: 2 }} // Explicit rowGap to ensure vertical spacing on wrap
      flexWrap="wrap"
      justifyContent="center"
      sx={{ px: { xs: 1, sm: 0 } }} // Responsive padding for alignment
    >
      {categories.map((category) => (
        <Button
          key={category}
          onClick={() => setSelected(category)}
          variant={selected === category ? "contained" : "outlined"}
          sx={{
            color: selected === category ? "#fff" : "#90caf9",
            background: selected === category ? "#3f51b5" : "transparent",
            borderColor: "#90caf9",
            borderRadius: 3,
            px: { xs: 1.5, sm: 2, md: 3 }, // Responsive padding
            py: { xs: 0.5, sm: 1 }, // Responsive padding
            mb: { xs: 0, sm: 0 }, // Remove mb since rowGap handles vertical spacing
            fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" }, // Responsive font size
            minWidth: { xs: "80px", sm: "100px" }, // Ensure buttons don't shrink too much
            "&:hover": {
              backgroundColor: "#303f9f",
              color: "#fff",
            },
          }}
        >
          {category}
        </Button>
      ))}
    </Stack>
  );
}