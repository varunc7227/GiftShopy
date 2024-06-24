import { Typography } from "@mui/material";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { PostDataApi } from "../../api/Api";

function SearchResult() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const categoryParams = queryParams.get("category");
  const searchInputParams = queryParams.get("searchInput");

  const allCategories = useSelector((state) => state.cart.itemsCategories);
  const [categoryCheckboxFilter, setCategoryCheckboxFilter] = useState([]);

  const [languages, setLanguages] = useState([
    { name: "English", selected: false },
    { name: "Hindi", selected: false },
    { name: "Telugu", selected: false },
    { name: "Gujarati", selected: false },
    { name: "Marathi", selected: false },
    { name: "Odia", selected: false },
  ]);

  useEffect(() => {
    window.scrollTo(0, 0);
    modifyCategoryForCheckbox();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    getSearchResults();
  }, [categoryParams, searchInputParams]);

  const getSearchResults = useCallback(() => {
    setLoading(true);
    const searchQuery = {
      category: categoryParams,
      searchInput: searchInputParams,
    };
    PostDataApi("/customer/getSearchResults", searchQuery)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error in search result", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [categoryParams, searchInputParams]);

  const modifyCategoryForCheckbox = () => {
    // console.log("into search by modified-category");
    const newCategory = allCategories.map((item) => ({
      name: item,
      selected: false,
    }));
    setCategoryCheckboxFilter(newCategory);
  };

  /**
   *
   * @function to update category checkbox state in filter panel in search result page
   */
  const onChangeCategoryCheckboxFilter = (item) => {
    setCategoryCheckboxFilter((prevState) =>
      prevState.map((category) =>
        category.name === item.name
          ? { ...category, selected: !category.selected }
          : category
      )
    );
  };

  /**
   *
   * @function to update language checkbox state in filter panel in search result page
   */
  const handleLanguageChange = (index) => {
    setLanguages((prevLanguages) => {
      const newLanguages = [...prevLanguages];
      newLanguages[index].selected = !newLanguages[index].selected;
      return newLanguages;
    });
  };

  /**
   *
   * @function to check if any category is selected
   */
  const checkForCategoryCheckboxFilter = () => {
    return categoryCheckboxFilter.some((item) => item.selected);
  };

  /**
   *
   * @function to check if any language is selected
   */
  const checkForCategorylanguage = () => {
    return languages.some((item) => item.selected);
  };

  /**
   *
   * @function to update sorting order change i.e. price low to high or high to low
   */
  const handleSortOrderChange = (value) => {
    setSortType(value);
  };

  /**
   *
   * @function to update filteredItems on change of price filter
   */
  const handlePriceFilter = (priceFilter) => {
    // console.log(priceFilter);
    const selectedFilters = [...categoryCheckboxFilter, ...languages].filter(
      (item) => item.selected
    );
    const filteredItems = [...item].filter((item) => {
      const isWithinSelectedFilters =
        selectedFilters.length === 0 ||
        selectedFilters.every((el) => item.tags.includes(el.name));
      const isWithinPriceRange =
        item.variants[0].price >= priceFilter.minPrice &&
        item.variants[0].price <= priceFilter.maxPrice;
      return isWithinSelectedFilters && isWithinPriceRange;
    });
    setFilterItem(filteredItems.length > 0 ? filteredItems : null);
  };

  const clearFilter = () => {
    dispatch(setPriceFilter([3, 150]));
    setLanguages([
      { name: "English", selected: false },
      { name: "Hindi", selected: false },
      { name: "Telugu", selected: false },
      { name: "Gujarati", selected: false },
      { name: "Marathi", selected: false },
      { name: "Odia", selected: false },
    ]);
    modifyCategoryForCheckbox();
    handleSortOrderChange(null);
    setFilterItem([]);
  };

  return (
    <div>
      <Typography>Search Result</Typography>
    </div>
  );
}

export default SearchResult;
