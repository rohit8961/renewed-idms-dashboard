import BrandOne from '../../images/brand/brand-01.svg';
import BrandTwo from '../../images/brand/brand-02.svg';
import BrandThree from '../../images/brand/brand-03.svg';
import BrandFour from '../../images/brand/brand-04.svg';
import BrandFive from '../../images/brand/brand-05.svg';
import DataTable from 'react-data-table-component';
import { FaTrash } from 'react-icons/fa';
import { useState } from 'react';

const initialBrandData = [
  {
    logo: BrandOne,
    name: 'Google',
    visitors: 3.5,
    revenues: '5,768',
    sales: 590,
    conversion: 4.8,
    active: true,
  },
  {
    logo: BrandTwo,
    name: 'Twitter',
    visitors: 2.2,
    revenues: '4,635',
    sales: 467,
    conversion: 4.3,
    active: true,
  },
  {
    logo: BrandThree,
    name: 'Github',
    visitors: 2.1,
    revenues: '4,290',
    sales: 420,
    conversion: 3.7,
    active: true,
  },
  {
    logo: BrandFour,
    name: 'Vimeo',
    visitors: 1.5,
    revenues: '3,580',
    sales: 389,
    conversion: 2.5,
    active: true,
  },
  {
    logo: BrandFive,
    name: 'Facebook',
    visitors: 3.5,
    revenues: '6,768',
    sales: 390,
    conversion: 4.2,
    active: true,
  },
  {
    logo: BrandOne,
    name: 'Google',
    visitors: 3.5,
    revenues: '5,768',
    sales: 590,
    conversion: 4.8,
    active: true,
  },
  {
    logo: BrandTwo,
    name: 'Twitter',
    visitors: 2.2,
    revenues: '4,635',
    sales: 467,
    conversion: 4.3,
    active: true,
  },
  {
    logo: BrandThree,
    name: 'Github',
    visitors: 2.1,
    revenues: '4,290',
    sales: 420,
    conversion: 3.7,
    active: true,
  },
  {
    logo: BrandFour,
    name: 'Vimeo',
    visitors: 1.5,
    revenues: '3,580',
    sales: 389,
    conversion: 2.5,
    active: true,
  },
  {
    logo: BrandFive,
    name: 'Facebook',
    visitors: 3.5,
    revenues: '6,768',
    sales: 390,
    conversion: 4.2,
    active: true,
  },
  {
    logo: BrandOne,
    name: 'Google',
    visitors: 3.5,
    revenues: '5,768',
    sales: 590,
    conversion: 4.8,
    active: true,
  },
  {
    logo: BrandTwo,
    name: 'Twitter',
    visitors: 2.2,
    revenues: '4,635',
    sales: 467,
    conversion: 4.3,
    active: true,
  },
  {
    logo: BrandThree,
    name: 'Github',
    visitors: 2.1,
    revenues: '4,290',
    sales: 420,
    conversion: 3.7,
    active: true,
  },
  {
    logo: BrandFour,
    name: 'Vimeo',
    visitors: 1.5,
    revenues: '3,580',
    sales: 389,
    conversion: 2.5,
    active: true,
  },
  {
    logo: BrandFive,
    name: 'Facebook',
    visitors: 3.5,
    revenues: '6,768',
    sales: 390,
    conversion: 4.2,
    active: true,
  },
];

const TableOne = () => {
  const [brandData, setBrandData] = useState(initialBrandData);

  const handleDelete = (name: string) => {
    setBrandData(brandData.filter((brand) => brand.name !== name));
  };

  const handleStatusToggle = (name: string) => {
    setBrandData(
      brandData.map((brand) =>
        brand.name === name
          ? { ...brand, active: !brand.active }
          : brand
      )
    );
  };

  const columns = [
    {
      name: 'Source',
      cell: (row: any) => (
        <div className="flex items-center gap-3">
          <img src={row.logo} alt="Brand" className="flex-shrink-0" />
          <p className="hidden text-black dark:text-white sm:block">{row.name}</p>
        </div>
      ),
      sortable: true,
    },
    {
      name: 'Visitors',
      selector: (row: any) => `${row.visitors}K`,
      sortable: true,
      center: true,
    },
    {
      name: 'Revenues',
      selector: (row: any) => `$${row.revenues}`,
      sortable: true,
      center: true,
    },
    {
      name: 'Sales',
      selector: (row: any) => row.sales,
      sortable: true,
      center: true,
      omit: window.innerWidth < 640,
    },
    {
      name: 'Conversion',
      selector: (row: any) => `${row.conversion}%`,
      sortable: true,
      center: true,
      omit: window.innerWidth < 640,
    },
    {
      name: 'Status',
      cell: (row: any) => (
        <button
          onClick={() => handleStatusToggle(row.name)}
          className={`px-2 py-1 rounded ${row.active ? 'bg-green-500' : 'bg-red-500'} text-white`}
        >
          {row.active ? 'Active' : 'Inactive'}
        </button>
      ),
      sortable: true,
      center: true,
    },
    {
      name: 'Actions',
      cell: (row: any) => (
        <button onClick={() => handleDelete(row.name)}>
          <FaTrash className="text-red-500" />
        </button>
      ),
      center: true,
    },
  ];

  const customStyles = {
    headCells: {
      style: {
        backgroundColor: 'var(--color-gray-2)',
        color: 'var(--color-black)',
        fontWeight: 'bold',
        textTransform: 'uppercase' as 'uppercase',
      },
    },
    cells: {
      style: {
        backgroundColor: 'var(--color-white)',
        color: 'var(--color-black)',
      },
    },
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Top Channels
      </h4>
      <DataTable
        columns={columns}
        data={brandData}
        customStyles={customStyles}
        pagination
      />
    </div>
  );
};

export default TableOne;
