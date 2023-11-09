import { useState } from 'react';
import CategoryItem from '../CategoryItem/CategoryItem';
import './navBar.css';

function NavBar() {
  const [categoryList, setCategoryList] = useState(['Frontend', 'Backend', 'Disign']);

  return (
    <div className='navBar'>
      <h3>Категории</h3>
      <ul>
        {categoryList.map((data, index) => (
          <CategoryItem key={index} data={data} />
        ))}
      </ul>
    </div>
  );
}

export default NavBar;
