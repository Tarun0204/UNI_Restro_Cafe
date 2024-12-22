import {useState, useEffect, useContext} from 'react'
import {ThreeDots} from 'react-loader-spinner'
import Header from '../Header'
import DishItem from '../DishItem'
import CartContext from '../../context/CartContext'
import './index.css'

const Home = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [homeResponse, setHomeResponse] = useState([])
  const [activeCategoryId, setActiveCategoryId] = useState('')

  const {cartList, setRestaurantName} = useContext(CartContext)

  const getHomeData = tableMenuItemsList =>
    tableMenuItemsList.map(eachMenuItem => ({
      menuCategory: eachMenuItem.menu_category,
      menuCategoryId: eachMenuItem.menu_category_id,
      menuCategoryImage: eachMenuItem.menu_category_image,
      categoryDishesItemsList: eachMenuItem.category_dishes.map(
        eachDishItem => ({
          dishId: eachDishItem.dish_id,
          dishName: eachDishItem.dish_name,
          dishPrice: eachDishItem.dish_price,
          dishImage: eachDishItem.dish_image,
          dishCurrency: eachDishItem.dish_currency,
          dishCalories: eachDishItem.dish_calories,
          dishDescription: eachDishItem.dish_description,
          dishAvailability: eachDishItem.dish_Availability,
          dishType: eachDishItem.dish_Type,
          addonCat: eachDishItem.addonCat,
        }),
      ),
    }))

  const restaurantApi = async () => {
    const apiUrl =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
    const apiResponse = await fetch(apiUrl)
    const data = await apiResponse.json()
    const updatedData = getHomeData(data[0].table_menu_list)
    setHomeResponse(updatedData)
    setRestaurantName(data[0].restaurant_name)
    setActiveCategoryId(updatedData[0].menuCategoryId)
    setIsLoading(false)
  }

  useEffect(() => {
    restaurantApi()
  })

  const onUpdateActiveCategoryIdx = menuCategoryId =>
    setActiveCategoryId(menuCategoryId)

  const addItemToCart = () => {}

  const removeItemFromCart = () => {}

  const renderTabMenuList = () =>
    homeResponse.map(eachCategory => {
      const onClickHandler = () =>
        onUpdateActiveCategoryIdx(eachCategory.menuCategoryId)

      return (
        <li
          className={`each-tab-item ${
            eachCategory.menuCategoryId === activeCategoryId
              ? 'active-tab-item'
              : ''
          }`}
          key={eachCategory.menuCategoryId}
          onClick={onClickHandler}
        >
          <button type="button" className="tab-category-button">
            {eachCategory.menuCategory}
          </button>
        </li>
      )
    })

  const renderDishes = () => {
    const {categoryDishesItemsList} = homeResponse.find(
      eachCategory => eachCategory.menuCategoryId === activeCategoryId,
    )

    return (
      <ul className="dishes-list-container">
        {categoryDishesItemsList.map(eachDishItem => (
          <DishItem
            key={eachDishItem.dishId}
            dishDetails={eachDishItem}
            addItemToCart={addItemToCart}
            removeItemFromCart={removeItemFromCart}
          />
        ))}
      </ul>
    )
  }

  const renderLoadingView = () => (
    <div className="loader-container">
      <ThreeDots type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  return isLoading ? (
    renderLoadingView()
  ) : (
    <>
      <Header cartItems={cartList} />
      <div className="home-background">
        <ul className="tab-container">{renderTabMenuList()}</ul>
        {renderDishes()}
      </div>
    </>
  )
}

export default Home