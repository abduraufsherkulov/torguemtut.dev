import React, { useState, useContext } from 'react'
import { CategoryContext } from '../../contexts/CategoryContext';
import HomeCarousel from './HomeCarousel';
import {
    RightIcon,
    ScrollDown,
    CartIcon,
    BestPricesIcon,
    ProtectIcon,
    ReliableIcon
} from '../../helpers/SvgHelper';
import { Link } from 'react-router-dom'


function FloatingBottom() {
    return (
        <ul className="x-anti-fear">
            <li className="x-anti-fear__item">
                <a className="x-anti-fear__item-content" href="">
                    <span className="x-anti-fear__icon-holder">
                        <CartIcon />
                    </span>
                    <span> <b className="x-anti-fear__title">Можно купить все</b>69 756 364 товаров и услуг</span>
                </a>
            </li>
            <li className="x-anti-fear__item">
                <a className="x-anti-fear__item-content" href="">
                    <span className="x-anti-fear__icon-holder">
                        <BestPricesIcon />
                    </span>
                    <span> <b className="x-anti-fear__title">Лучшие цены</b>Найдите дешевле</span>
                </a>
            </li>

            <li className="x-anti-fear__item">
                <a className="x-anti-fear__item-content" href="">
                    <span className="x-anti-fear__icon-holder">
                        <ProtectIcon />
                    </span>
                    <span> <b className="x-anti-fear__title">Защита покупателей</b>Защищаем покупки на 3 000 сум</span>
                </a>
            </li>

            <li className="x-anti-fear__item">
                <a className="x-anti-fear__item-content" href="">
                    <span className="x-anti-fear__icon-holder">
                        <ReliableIcon />
                    </span>
                    <span> <b className="x-anti-fear__title">Надежные продавцы</b>Прошли проверку Prom.ua</span>
                </a>
            </li>
        </ul>
    )
}




function FloatingMenuItem({ cat, setSecondLevel, setThirdLevel, lvl, secondLevel, setCurrentCol }) {
    // console.log(cat.children)
    const [activeItem, setActiveItem] = useState(false)
    let activeClass = activeItem ? "portalCategoriesMenu__item--13TAa portalCategoriesMenu__linkStateActive--2x_OG" : "portalCategoriesMenu__item--13TAa"

    const handleMouseOver = (e, children) => {
        // console.log(e.pageX, e.pageY, e.currentTarget.getBoundingClientRect())
        setActiveItem(true)
        if (lvl == 1) {
            setCurrentCol([0, 1])
        } else if (lvl == 2) {
            setCurrentCol([1, 2])
        } else if (lvl == 3) {
            setCurrentCol([2, 3])
        }

        // lvl != 3 ? setSecondLevel(children) : null
        if (lvl == 1) {
            setThirdLevel([])
            setSecondLevel(children)
        } else if (lvl == 2) {
            setThirdLevel(children)
        }
    }

    const handleMouseLeave = (e) => {
        // if (lvl == 1 && e.clientX == 459 || e.clientX == 460) {
        //     setActiveItem(true)
        // } else if (lvl == 1 && e.clientX != 459 || e.clientX != 460) {
        //     setActiveItem(false)
        // }
        setActiveItem(false)
    }
    return (
        <li onMouseOver={(e) => handleMouseOver(e, cat.children)} onMouseLeave={(e) => handleMouseLeave(e)} className={activeClass}>

            <Link className="portalCategoriesMenu__link--2I1GQ" to={`/subcategories/${cat.value}`}>
                <span className="portalCategoriesMenu__title--2sUdr">{cat.name}</span>
                <span className="portalCategoriesMenu__arrowHolder--3cLQr">{cat.children && cat.children.length > 0 ? <RightIcon /> : null}</span>
            </Link>
        </li>
    )
}





function FloatingMenu({ category, setFloating }) {
    const [secondLevel, setSecondLevel] = useState([])
    const [thirdLevel, setThirdLevel] = useState([])
    const [currentCol, setCurrentCol] = useState([0, 0]);
    return (
        <div style={{ display: 'block' }} className="floatingmenu">
            <span className="portalCategoriesMenu__overlay--1HRbA"></span>
            <div className="portalCategoriesMenu__wrapper--ub8rf">
                <div onMouseLeave={() => setFloating(false)} id="main-menu-table-holder-id" className="portalCategoriesMenu__tableHolder--7dPE7">
                    <div className="portalCategoriesMenu__table--v5p3b">
                        {/* table item */}
                        <div className="portalCategoriesMenu__column--f_Zf6">
                            <div className="portalCategoriesMenu__columnContent--8Yr5n">
                                <ul className="portalCategoriesMenu__list--1Nfz6">
                                    {category.map((cat, index) => (
                                        cat.parentId == null ?
                                            <FloatingMenuItem
                                                setThirdLevel={setThirdLevel}
                                                setCurrentCol={setCurrentCol}
                                                currentCol={currentCol}
                                                secondLevel={secondLevel}
                                                lvl={1}
                                                setSecondLevel={setSecondLevel}
                                                key={index}
                                                cat={cat} /> : null
                                    ))}
                                </ul>
                                {/* <span className="portalCategoriesMenu__scrollButton--3rtih portalCategoriesMenu__scrollButtonPositionBottom--hciZH">
                                    <ScrollDown />
                                </span> */}
                            </div>
                        </div>
                        {secondLevel.length > 0 ?
                            <div className="portalCategoriesMenu__column--f_Zf6">
                                <div className="portalCategoriesMenu__columnContent--8Yr5n">
                                    <ul className="portalCategoriesMenu__list--1Nfz6">
                                        {secondLevel.map((seclvl, index) => (
                                            <FloatingMenuItem
                                                currentCol={currentCol}
                                                setCurrentCol={setCurrentCol}
                                                thirdLevel={thirdLevel}
                                                lvl={2}
                                                setThirdLevel={setThirdLevel}
                                                setSecondLevel={setSecondLevel}
                                                key={index}
                                                cat={seclvl} />
                                        ))}
                                    </ul>
                                    <span className="portalCategoriesMenu__scrollButton--3rtih portalCategoriesMenu__scrollButtonPositionBottom--hciZH">
                                        <ScrollDown />
                                    </span>
                                </div>
                            </div> : null
                        }

                        {thirdLevel.length > 0 ?
                            <div className="portalCategoriesMenu__column--f_Zf6">
                                <div className="portalCategoriesMenu__columnContent--8Yr5n">
                                    <ul className="portalCategoriesMenu__list--1Nfz6">
                                        {thirdLevel.map((thrlvl, index) => (
                                            <FloatingMenuItem
                                                currentCol={currentCol}
                                                setThirdLevel={setThirdLevel}
                                                setSecondLevel={setSecondLevel}
                                                setCurrentCol={setCurrentCol}
                                                lvl={3}
                                                key={index}
                                                cat={thrlvl} />
                                        ))}
                                    </ul>
                                    <span className="portalCategoriesMenu__scrollButton--3rtih portalCategoriesMenu__scrollButtonPositionBottom--hciZH">
                                        <ScrollDown />
                                    </span>
                                </div>
                            </div> : null
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}




function FloatingCategories() {
    const [floating, setFloating] = useState(false);

    const { category } = useContext(CategoryContext)
    return (
        <div id="floatingcategories" className="x-categories-view">
            <div className="x-categories-view__table">
                <div className="x-categories-view__content-holder">
                    <div className="x-categories-view__content">
                        {/* slider */}
                        <div className="x-categories-view__slider-holder">
                            {/* <div className="x-slider">
                                <ul></ul>
                            </div> */}
                            <HomeCarousel />
                        </div>
                        {/* right col */}
                        <div className="x-categories-view__action-holder"></div>
                    </div>

                    {/* pin bottom */}
                    {/* <FloatingBottom /> */}



                </div>
                {/* navbar */}
                <div className="x-categories-view__menu-holder" >
                    <div onMouseOver={() => setFloating(true)} className="x-categories-menu ">
                        <div className="portalCategoriesMenu__stateStatic--3oxxu">
                            <ul className="portalCategoriesMenu__list--1Nfz6 portalCategoriesMenu__listTypeFake--3JlQn">
                                {category.map((cat, index) => {
                                    if (cat.parentId == null) {
                                        return (
                                            <li key={index} className="portalCategoriesMenu__item--13TAa">
                                                <span className="portalCategoriesMenu__link--2I1GQ">
                                                    <span className="portalCategoriesMenu__title--2sUdr">{cat.name}</span>
                                                </span>
                                            </li>
                                        )
                                    }
                                })}
                            </ul>
                            {/* {floating ? <FloatingMenu setFloating={setFloating} floating={floating} category={category} /> : <FloatingMenu setFloating={setFloating} floating={floating} category={category} />} */}

                            {floating ? <FloatingMenu setFloating={setFloating} floating={floating} category={category} /> : null}
                        </div>
                    </div>
                </div>

            </div>
        </div >
    )
}

export default FloatingCategories
