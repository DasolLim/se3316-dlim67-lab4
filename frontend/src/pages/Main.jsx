import React, { useEffect, useState } from 'react';
import SearchForm from '../components/SearchForm.jsx';
import SuperheroDetails from '../components/SuperheroDetails';
import Spinner from '../components/Spinner';
import { getSuperheroes } from '../features/search/searchService';
import { useSelector } from 'react-redux';

const getSearchCategoryLabel = (searchCategory) => {
    switch (searchCategory) {
        case 'name':
            return 'Name';
        case 'race':
            return 'Race';
        case 'publisher':
            return 'Publisher';
        case 'power':
            return 'Power';
        default:
            return '';
    }
};

function Dashboard() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchCategory, setSearchCategory] = useState('name');
    const [superheroes, setSuperheroes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedSuperhero, setSelectedSuperhero] = useState(null);

    const { user } = useSelector((state) => state.auth);

    const handleSuperheroClick = (superhero) => {
        setSelectedSuperhero(superhero);
    };

    const [selectedCategoryLabel, setSelectedCategoryLabel] = useState(getSearchCategoryLabel('name'));

    const handleCategoryChange = (category) => {
        setSearchCategory(category);
        setSelectedCategoryLabel(getSearchCategoryLabel(category));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const response = await getSuperheroes(searchCategory, searchTerm);
            setSuperheroes(response);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // Initial load (optional)
        handleSubmit({ preventDefault: () => { } });
    }, []); // Run once on component mount

    return (
        <>
            <section className='heading'>
                <h1>Welcome {user && user.name}</h1>
                <p>Superhero Information</p>
            </section>

            <SearchForm
                onSubmit={handleSubmit}
                onInputChange={(e) => setSearchTerm(e.target.value)}
                searchTerm={searchTerm}
                searchCategory={searchCategory}
                onCategoryChange={handleCategoryChange}
            />

            <section className='content'>
                {isLoading ? (
                    <Spinner />
                ) : (
                    <div className='superhero-list'>
                        {superheroes.map((superhero) => (
                            <SuperheroDetails key={superhero.id} superhero={superhero} />
                        ))}
                    </div>
                )}
            </section>
        </>
    );
}

export default Dashboard;
