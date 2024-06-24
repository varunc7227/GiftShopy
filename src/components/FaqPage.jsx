import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Skeleton,
  Typography,
} from "@mui/material";
import { Fragment, useEffect, useMemo, useState } from "react";
import { ExpandMore } from "@mui/icons-material";
import NoResultFound from "./NoResultFound";
import { fetchDataFromApi } from "../utils/api";

function FaqPage() {
  const [loading, setLoading] = useState(false);
  const [faqs, setFaqs] = useState([]);
  const [faqsData, setFaqsData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getAllFaqs();
  }, []);

  useEffect(() => {
    const filteredFaqs = faqsData.filter((faq) =>
      faq.attributes.Questions.toLowerCase().includes(search.toLowerCase())
    );
    setFaqs(filteredFaqs);
  }, [search, faqsData]);

  const getAllFaqs = async () => {
    setLoading(true);
    try {
      const response = await fetchDataFromApi("/api/web-app-faqs");
      if (response?.data) {
        console.log(response.data, "faqs");
        setFaqs(response.data);
        setFaqsData(response.data);
      } else {
        console.log("No FAQs data received from API");
      }
    } catch (error) {
      console.error("Error fetching FAQs:", error);
    } finally {
      setLoading(false);
    }
  };

  const showNoResults = search !== "" && faqs.length === 0;

  return (
    <Fragment>
      <Box>
        <div className="container boxess" style={{ marginTop: "0rem" }}>
          <Typography
            style={{
              fontFamily: "Satoshi, sans-serif",
              fontSize: "2rem",
              fontWeight: 600,
              padding: "2rem 0",
              textAlign: "center",
            }}
          >
            Frequently Asked Question
          </Typography>
          <div style={searchboxFaq}>
            <div className="input-container">
              <input
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for Questions..."
                type="text"
                value={search}
                style={inputStyle}
              />
            </div>
          </div>
          {!loading ? (
            <div style={{ display: "flex", flexDirection: "column" }}>
              {faqs.map((item, index) => (
                <Accordion key={index}>
                  <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls={`panel-${index}-content`}
                    id={`panel-${index}-header`}
                    sx={{ padding: "1rem" }}
                  >
                    <Typography
                      style={{
                        fontFamily: "Satoshi, sans-serif",
                        fontSize: "1rem",
                        fontWeight: 600,
                        textAlign: "left",
                      }}
                    >
                      {item.attributes.Questions}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography
                      style={{
                        fontFamily: "Satoshi, sans-serif",
                        fontSize: "1.2rem",
                        fontWeight: 500,
                        textAlign: "left",
                        color: "slategrey",
                      }}
                    >
                      {item.attributes.Answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </div>
          ) : (
            // <Skeleton />
            Array.from({ length: 4 }, (_, index) => (
              <Accordion key={index}>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls={`panel-${index}-content`}
                  id={`panel-${index}-header`}
                  sx={{ padding: "1rem" }}
                >
                  <Typography
                    style={{
                      fontSize: "1rem",
                      textAlign: "left",
                      width: "100%",
                    }}
                  >
                    <Skeleton variant="text" width="60%" />
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    style={{
                      fontSize: "1.2rem",
                      textAlign: "left",
                    }}
                  >
                    <Skeleton width="100%" />
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))
          )}
        </div>
        {showNoResults && <NoResultFound />}
      </Box>
    </Fragment>
  );
}

/**
 * @Styles
 */

const searchboxFaq = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  marginBottom: "20px",
};

const inputStyle = {
  padding: "10px",
  margin: "0",
  fontSize: "1rem",
  border: "1px solid #ccc",
  borderRadius: "2rem",
  width: "100%",
  boxSizing: "border-box",
  width: "200px",
};
export default FaqPage;
