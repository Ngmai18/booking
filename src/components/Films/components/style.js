import { makeStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { underLine } from "../../../utils/bonusStyle";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";

const useStyles = makeStyles({
  cumRapItem: {
    transition: "height .2s",
    overflowY: "hidden",
    ...underLine,
  },
  topInfo: {
    paddingBottom: 20,
    cursor: "pointer",
  },
  imgTheater: {
    width: 50,
    float: "left",
    display: "inline-block",
    border: "1px solid #ebebec",
  },
  wrapInfo: {
    paddingLeft: 4,
  },

  digital: {
    marginBottom: 5,
    fontWeight: 500,
  },
  text__first: (props) => ({
    color: props.color ? `${props.color}` : "#000",
    fontWeight: "500",
    fontSize: props.testSize ? props.testSize : 14,
  }),
  text__second: {
    color: "#000",
    fontWeight: "500",
  },
  button: {
    // width: "calc(25% - 10px)",
    fontWeight: 400,
    padding: "5px 5px",
    transition: "all .2s",
    backgroundColor: "rgba(246,246,246,.5)",
    borderRadius: "7px",
    color: "#9b9b9b",
    border: "1px solid #e4e4e4",
    "&:hover :first-child": {
      color: "#fb4226",
    },
    fontSize: 14,
  },
  inTime: {
    fontSize: 14,
    fontWeight: 500,
    color: "#108f3e",
  },
});

const Accordion = withStyles({
  root: {
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    alignItems: "center",
    gap: 12,
    "& > img": {
      width: 50,
    },
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    gap: "10px",
    flexDirection: "row",
    flexWrap: "wrap",
  },
}))(MuiAccordionDetails);

export { useStyles, Accordion, AccordionSummary, AccordionDetails };
