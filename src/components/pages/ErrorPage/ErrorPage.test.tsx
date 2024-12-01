import { render } from "@testing-library/react";
import ErrorPage from "./ErrorPage";
import Four from "@assets/4.svg";
import Zero from "@assets/0.svg";

describe("ErrorPage Component", () => {
  it("should render the error images and text", () => {
    const { getByText, getAllByRole } = render(<ErrorPage />);

    expect(getByText("Page not found")).toBeInTheDocument();
    expect(
      getByText(
        "The page you are trying to reach is not available. It may have been deleted or its URL was misspelled."
      )
    ).toBeInTheDocument();

    expect(getByText("Go back")).toBeInTheDocument();

    const images = getAllByRole("img");
    expect(images.length).toBe(3);

    expect(images[0]).toHaveAttribute("src", Four);
    expect(images[1]).toHaveAttribute("src", Zero);
    expect(images[2]).toHaveAttribute("src", Four);
  });
});
