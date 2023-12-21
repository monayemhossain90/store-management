import {Fragment, useEffect, useRef, useState} from 'react';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import ReactPaginate from "react-paginate";
import {DeleteProductRequest, ProductListRequest, UpdateStockRequest} from "../../ApiServices/ProductApiRequest";
import { selectProductList, selectProductListTotal } from "../../redux/state-slice/productSlice";
import { DeleteAlert } from "../../helper/DeleteAlert";
import {ErrorToast, SuccessToast} from "../../helper/ValidationHelper.js";

const ProductList = () => {
    let stockRef = useRef();

    let [searchKeyword, setSearchKeyword] = useState("0");
    let [perPage, setPerPage] = useState(20);
    const DataList = useSelector(selectProductList);

    useEffect(() => {
        (async () => {
            await ProductListRequest(1, perPage, searchKeyword);
        })();
    }, [perPage, searchKeyword])


    // console.log(DataList);
    let Total = useSelector(selectProductListTotal)

    const handlePageClick = async (event) => {
        await ProductListRequest(event.selected + 1, perPage, searchKeyword)
    };
    const searchData = async () => {
        await ProductListRequest(1, perPage, searchKeyword)
    }
    const perPageOnChange = async (e) => {
        setPerPage(parseInt(e.target.value))
        await ProductListRequest(1, e.target.value, searchKeyword)
    }
    const searchKeywordOnChange = async (e) => {
        setSearchKeyword(e.target.value)
        if ((e.target.value).length === 0) {
            setSearchKeyword("0")
            await ProductListRequest(1, perPage, "0")
        }
    }

    const TextSearch = (e) => {
        const rows = document.querySelectorAll('tbody tr')
        rows.forEach(row => {
            row.style.display = (row.innerText.includes(e.target.value)) ? '' : 'none'
        })
    }





    //DeleteItem
    const DeleteItem = async (id) => {
        let Result = await DeleteAlert();
        if (Result.isConfirmed === true) {
            let DeleteResult = await DeleteProductRequest(id);
            if (DeleteResult === true) {
                await ProductListRequest(1, perPage, searchKeyword);
            }
        }
    }



    ///Update issues & Product
    const UpdateStock = async (unit, id) => {
        let stock = stockRef.value.trim();
        if(stock < 1){
            ErrorToast("Stock is minimum 1 required");
        }else{
          let result = await UpdateStockRequest(unit,id);
          if(result===true){
              stockRef.value=null;
              await ProductListRequest(1, perPage, searchKeyword)
          }
        }
    }



    return (
        <Fragment>
            <div className="container-fluid my-5">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-4">
                                            <h5> Product List</h5>
                                        </div>

                                        <div className="col-2">
                                            <input onKeyUp={TextSearch} placeholder="Text Filter" className="form-control form-control-sm" />
                                        </div>

                                        <div className="col-2">
                                            <select onChange={perPageOnChange} className="form-control mx-2 form-select-sm form-select form-control-sm" >
                                                <option value="20">20 Per Page</option>
                                                <option value="30">30 Per Page</option>
                                                <option value="50">50 Per Page</option>
                                                <option value="100">100 Per Page</option>
                                                <option value="100">200 Per Page</option>
                                            </select>
                                        </div>
                                        <div className="col-4">
                                            <div className="input-group mb-3">
                                                <input onChange={searchKeywordOnChange} type="text" className="form-control form-control-sm" placeholder="Search.." aria-label="Recipient's username" aria-describedby="button-addon2" />
                                                <button onClick={searchData} className="btn  btn-success btn-sm mb-0" type="button">Search</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="table-responsive table-section">
                                                <table className="table ">
                                                    <thead className="sticky-top bg-white">
                                                        <tr>
                                                            <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Name</td>
                                                            <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Unit</td>
                                                            <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Price</td>
                                                            <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Total</td>
                                                            <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Brand</td>
                                                            <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Categories</td>
                                                            <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Action</td>
                                                            <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Issues/Stock</td>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            DataList.map((item, i) =>
                                                                <tr key={i.toString()}>
                                                                    <td><p className="text-xs text-start">{item.ProductName}</p></td>
                                                                    <td><p className="text-xs text-start">{item.Unit}</p></td>
                                                                    <td><p className="text-xs text-start">{item.Price}</p></td>
                                                                    <td><p className="text-xs text-start">{Number(item.Unit *item.Price)}</p></td>
                                                                    <td><p className="text-xs text-start">{item.BrandName}</p></td>
                                                                    <td><p className="text-xs text-start">{item.CategoryName}</p></td>
                                                                    <td>
                                                                        <Link to={`/ProductUpdatePage/${item._id}`} className="btn text-info btn-outline-light p-2 mb-0 btn-sm">
                                                                            <AiOutlineEdit size={15} />
                                                                        </Link>
                                                                        <button onClick={DeleteItem.bind(this, item._id)} className="btn btn-outline-light text-danger p-2 mb-0 btn-sm ms-2">
                                                                            <AiOutlineDelete size={15} />
                                                                        </button>
                                                                    </td>
                                                                    <td>
                                                                        <input ref={(input)=>stockRef=input} type="number" style={{width: "170px"}}/>
                                                                        <button className="btn text-info btn-outline-light p-2 ml-3 mb-0 btn-sm" onClick={()=>UpdateStock(Number(item.Unit)+ Number(stockRef.value), item._id)}>
                                                                           Add
                                                                        </button>
                                                                        <button onClick={()=>UpdateStock(Number(item.Unit) - Number(stockRef.value), item._id)} className="btn btn-outline-light text-danger p-2 mb-0 btn-sm ms-2">
                                                                           minus
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="col-12 mt-5">
                                            <nav aria-label="Page navigation example">
                                                <ReactPaginate
                                                    previousLabel="<"
                                                    nextLabel=">"
                                                    pageClassName="page-item"
                                                    pageLinkClassName="page-link"
                                                    previousClassName="page-item"
                                                    previousLinkClassName="page-link"
                                                    nextClassName="page-item"
                                                    nextLinkClassName="page-link"
                                                    breakLabel="..."
                                                    breakClassName="page-item"
                                                    breakLinkClassName="page-link"
                                                    pageCount={Math.ceil(Total / perPage)}
                                                    marginPagesDisplayed={2}
                                                    pageRangeDisplayed={5}
                                                    onPageChange={handlePageClick}
                                                    containerClassName="pagination"
                                                    activeClassName="active"
                                                />
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default ProductList;