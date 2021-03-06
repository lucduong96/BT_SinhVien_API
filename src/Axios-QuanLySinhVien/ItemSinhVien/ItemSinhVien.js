import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  LUU_SINH_VIEN,
  SET_DANH_SACH_SV,
  SUA_SINH_VIEN,
  XOA_SINH_VIEN,
} from "../Redux/constant/quanlySvConstant";
import { sinhVienServ } from "../SinhVienServ/sinhVienServ";

class ItemSinhVien extends Component {
  xoaSinhVien = () => {
    sinhVienServ
      .xoaSinhVien(this.props.sv.id)
      .then((res) => {
        console.log("res", res);
        sinhVienServ
          .layDanhSachSinhVIen()
          .then((res) => {
            this.props.setDssv(res.data);
          })
          .catch();
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  render() {
    let { sv } = this.props;
    return (
      <tr>
        <td>{sv.id}</td>
        <td>{sv.name}</td>
        <td>{sv.email}</td>
        <td>{sv.phone}</td>
        <td className="flex">
          <button
            data-toggle="modal"
            data-target="#modelId"
            className="btn btn-success mr-1"
            onClick={() => {
              this.props.suaSinhVien(sv);
            }}
          >
            Sửa
          </button>
          <button
            onClick={() => {
              // this.props.xoaSinhVien(sv.id);
              this.xoaSinhVien();
            }}
            className="btn btn-danger"
          >
            Xoá
          </button>
          <button className="btn btn-secondary">
            <NavLink to={`/detail/${sv.id}`}>Xem chi tiết</NavLink>
          </button>
        </td>
      </tr>
    );
  }
}

// let mapDispatchToProps=(dispatch)=>{

// }

let mapDispatchToProps = (dispatch) => {
  return {
    xoaSinhVien: (id) => {
      dispatch({
        type: XOA_SINH_VIEN,
        payload: id,
      });
    },
    suaSinhVien: (sv) => {
      dispatch({
        type: SUA_SINH_VIEN,
        payload: sv,
      });
    },
    capNhatSinhVien: (sv) => {
      dispatch({
        type: LUU_SINH_VIEN,
        payload: sv,
      });
    },
    setDssv: (data) => {
      dispatch({
        type: SET_DANH_SACH_SV,
        payload: data,
      });
    },
  };
};

export default connect(null, mapDispatchToProps)(ItemSinhVien);
