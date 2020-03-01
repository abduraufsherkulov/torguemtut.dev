import React, { useState, useContext } from 'react'
import { CategoryContext } from '../../contexts/CategoryContext';
import HomeCarousel from './HomeCarousel';

function RightIcon(props) {
    return (
        <svg className="portalCategoriesMenu__arrow--jqd9p" viewBox="0 0 129 129" {...props}>
            <path d="M40.4 121.3c-.8.8-1.8 1.2-2.9 1.2s-2.1-.4-2.9-1.2c-1.6-1.6-1.6-4.2 0-5.8l51-51-51-51c-1.6-1.6-1.6-4.2 0-5.8 1.6-1.6 4.2-1.6 5.8 0l53.9 53.9c1.6 1.6 1.6 4.2 0 5.8l-53.9 53.9z" />
        </svg>
    )
}

function ScrollDown(props) {
    return (
        <svg className="portalCategoriesMenu__scrollIcon--Spvyz" viewBox="0 0 129 129" {...props}>
            <path d="M121.3 34.6c-1.6-1.6-4.2-1.6-5.8 0l-51 51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8 0-1.6 1.6-1.6 4.2 0 5.8l53.9 53.9c.8.8 1.8 1.2 2.9 1.2 1 0 2.1-.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2.1-5.8z" />
        </svg>
    )
}

function CartIcon(props) {
    return (
        <svg className="x-anti-fear__icon" viewBox="0 0 26 26" {...props}>
            <path d="M12.8 23.6c0 1-.8 1.9-1.9 1.9-1 0-1.9-.8-1.9-1.9s.8-1.9 1.9-1.9c1 0 1.9.9 1.9 1.9m9.2 0c0 1-.8 1.9-1.9 1.9-1 0-1.9-.8-1.9-1.9s.8-1.9 1.9-1.9c1 0 1.9.9 1.9 1.9m-.3-6.6H9.9L7.1 6.6H24L21.7 17zm4-11.8c-.2-.3-.6-.5-1-.5h-18L5.7.8C5.5.3 5 0 4.5 0H.9C.4 0 0 .4 0 .9s.4.9.9.9h3L8.3 18c.2.5.6.9 1.2.9h12.7c.5 0 1-.4 1.2-1L26 6.4c.1-.4 0-.8-.3-1.2z" />
        </svg>
    )
}

function BestPricesIcon(props) {
    return (
        <svg className="x-anti-fear__icon" viewBox="0 0 28 28" {...props}>
            <path d="M19.1 7.2c-1.1 0-1.9.9-1.9 1.9S18 11 19.1 11s1.9-.8 1.9-1.9-.9-1.9-1.9-1.9m-5.2 18.5L4.3 19 15.9 3.2c1.9.8 4.1.5 5.5-1l3.1 2.2c-.4.9-.5 1.9-.4 2.9.2 1 .6 1.9 1.3 2.6L13.9 25.7zM27.4 9c-.7-.5-1.1-1.2-1.3-2-.1-.8 0-1.6.5-2.3.1-.2.2-.5.2-.7 0-.3-.2-.5-.4-.6L21.9.2c-.2-.2-.5-.2-.8-.2-.2 0-.5.2-.6.4-.5.7-1.2 1.1-2 1.3-.8.1-1.6 0-2.3-.5-.4-.3-1-.2-1.3.2L2.2 18.6c-.2.2-.2.5-.2.8 0 .3.2.5.4.6l11.2 7.8c.2.1.4.2.6.2.3 0 .6-.1.8-.4l12.7-17.2c.2-.2.2-.5.2-.7-.1-.3-.3-.5-.5-.7z" />
        </svg>
    )
}

function ProtectIcon(props) {
    return (
        <svg className="x-anti-fear__icon" viewBox="0 0 26 26" {...props}>
            <path d="M21.6 7.5c-.1 3-.1 6.7-1.4 9.1-2 3.6-5.6 6-7.1 7-.1.1-.2.1-.3.2-1.5-.9-5.1-2.9-7.3-7-1.3-2.4-1.4-6.6-1.5-9.6v-.3c3.9.8 7.2-2.5 8.8-4.5 1.6 2.1 4.9 5.3 8.8 4.5v.6zm-9 17.3l.6-.8-.6.8zM23 5.2c-.4-.3-1-.4-1.5-.3-3.4.9-6.4-2.7-7.6-4.3-.2-.4-.6-.6-1.1-.6-.5 0-.9.2-1.1.6-1.2 1.6-4.2 5.3-7.6 4.3-.5-.1-1.1 0-1.5.3-.4.3-.6.7-.6 1.2v.9c.1 3.4.2 7.7 1.7 10.5 2.5 4.5 6.4 6.8 8.1 7.8l.3.2c.3.2.5.3.8.3.3 0 .5-.1.8-.3.1-.1.3-.2.6-.4 1.6-1.1 5.5-3.7 7.7-7.7 1.6-2.8 1.6-6.8 1.7-10V6.6c-.1-.7-.3-1.1-.7-1.4z" />
        </svg>
    )
}

function ReliableIcon(props) {
    return (
        <svg className="x-anti-fear__icon" viewBox="0 0 20 20" {...props}>
            <path
                fill="#4cb748"
                d="M14.83 13.1V20L10 16.28 5.17 20v-6.9A7.75 7.75 0 0010 14.83a7.75 7.75 0 004.83-1.73zm-4.83.69a6.9 6.9 0 116.9-6.89 6.92 6.92 0 01-6.9 6.89zM10 9l2.41 1.31-.48-2.69 2-1.93-2.69-.42L10 2.76 8.76 5.24l-2.69.35 2 1.93-.48 2.69z"
            />
        </svg>
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
            <a className="portalCategoriesMenu__link--2I1GQ" href="">
                <span className="portalCategoriesMenu__title--2sUdr">{cat.name}</span>
                <span className="portalCategoriesMenu__arrowHolder--3cLQr">{lvl != 3 ? <RightIcon /> : null}</span>
            </a>
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
                                <span className="portalCategoriesMenu__scrollButton--3rtih portalCategoriesMenu__scrollButtonPositionBottom--hciZH">
                                    <ScrollDown />
                                </span>
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
