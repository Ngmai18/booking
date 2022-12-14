import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./style";
import { Button, Modal } from "antd";
import SingleSeat from "../../../../components/Booking/components/SingleSeat";
import { useParams } from "react-router-dom";
import {
  clearErrors,
  getReleasedTimeDetails,
} from "../../../../actions/releasedTimeAction";
import {
  formatCurrency,
  formatDateTimeToString,
  splitText,
} from "../../../../utils/helper";
import { Space } from "antd";
import ResultBookingTicket from "../ResultBookingTicket/ResultBookingTicket";

const Payment = (seat) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [coupon, setCoupon] = useState();
  const [valueCoupon, setValueCoupon] = useState(0);
  const params = useParams();
  const seats = seat.dataFromMain;

  const { releasedTime, loading, error } = useSelector(
    (state) => state.releasedTimeDetails
  );
  const subTotal = seat.dataFromMain.length * releasedTime.price - valueCoupon;

  const onSubmit = () => {
    if (coupon === "giamgia1") {
      setValueCoupon(10000);
    } else if (coupon === "giamgia2") {
      setValueCoupon(50000);
    } else if (coupon === "giamgia3") {
      setValueCoupon(100000);
    } else {
      setValueCoupon(0);
    }
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getReleasedTimeDetails(params.id));
  }, [dispatch, params.id, error, alert]);
  const classes = useStyles();
  const onChange = (e) => {};
  //// modal
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setLoadingBtn(true);
    setTimeout(() => {
      setLoadingBtn(false);
      setOpen(false);
    }, 3000);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  console.log(coupon);
  return (
    <aside className={classes.payMent}>
      <div>
        {/* t???ng ti???n */}
        <p className={`${classes.amount} ${classes.payMentItem}`}>{subTotal}</p>

        {/* th??ng tin phim v?? r???p */}
        <div className={classes.payMentItem}>
          <p className={classes.tenPhim}>{releasedTime.film}</p>
          <p>{releasedTime.cinema}</p>
          <p>{splitText(formatDateTimeToString(releasedTime.date), 10)}</p>
        </div>

        {/* gh??? ???? ch???n */}
        <div className={`${classes.seatInfo} ${classes.payMentItem}`}>
          <span>
            <Space size={10}>
              {`Gh??? `}
              {seats}
            </Space>
          </span>

          <p className={classes.amountLittle}>
            {formatCurrency(releasedTime.price)} ??
          </p>
        </div>

        {/* email */}
        <div className={classes.payMentItem}>
          <label className={classes.labelEmail}>E-Mail: {user?.email}</label>
        </div>

        {/* phone */}
        <div className={classes.payMentItem}>
          <label className={classes.labelPhone}>Phone: {user?.phone}</label>
        </div>

        {/* M?? gi???m gi?? */}
        <div className={classes.payMentItem}>
          <label className={classes.label}>M?? gi???m gi??</label>
          <input
            type="text"
            placeholder="Nh???p m?? gi???m gi?? n???u c??."
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            className={classes.fillIn}
          />
          <button className={classes.btnDiscount} onClick={onSubmit}>
            ??p d???ng
          </button>
        </div>

        {/* h??nh th???c thanh to??n */}
        <div className={classes.selectedPayMentMethod}>
          <label className={classes.label}>H??nh th???c thanh to??n</label>
          <p className={classes.toggleNotice}>
            Vui l??ng ch???n gh??? ????? hi???n th??? ph????ng th???c thanh to??n ph?? h???p.
          </p>
          <div className={classes.formPayment}>
            <div className={classes.formPaymentItem}>
              <input
                className={classes.input}
                type="radio"
                name="paymentMethod"
                value="Visa, Master, JCB"
                onChange={onChange}
              />
              <img
                className={classes.img}
                src="/img/bookticket/visa.png"
                alt="visa"
              />
              <label>Visa, Master, JCB</label>
            </div>
            <div className={classes.formPaymentItem}>
              <input
                className={classes.input}
                type="radio"
                name="paymentMethod"
                value="ATM n???i ?????a"
                onChange={onChange}
              />
              <img
                className={classes.img}
                src="/img/bookticket/atm.png"
                alt="atm"
              />
              <label>Th??? ATM n???i ?????a</label>
            </div>
          </div>
        </div>

        {/* ?????t v?? */}
        <div className={classes.bottomSection}>
          <button className={classes.btnDatVe} onClick={showModal}>
            <p className={classes.txtDatVe}>?????t V??</p>
          </button>
        </div>
      </div>

      {/* notice */}
      <div className={classes.notice}>
        <img
          className={classes.imgNotice}
          src="/img/bookticket/exclamation.png"
          alt="notice"
        />
        <span>V?? ???? mua kh??ng th??? ?????i ho???c ho??n ti???n</span>
        <p>
          M?? v?? s??? ???????c g???i qua tin nh???n{" "}
          <span className={classes.contactColor}>ZMS</span> (tin nh???n Zalo) v??{" "}
          <span className={classes.contactColor}>Email</span> ???? nh???p.
        </p>
      </div>
      <Modal
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        title="Th??ng tin thanh to??n"
      >
        <ResultBookingTicket seatNumber={seats} />
      </Modal>
    </aside>
  );
};

export default Payment;
