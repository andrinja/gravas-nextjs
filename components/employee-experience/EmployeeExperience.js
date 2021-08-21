import Experience from './style';
import { useTranslation } from 'next-i18next';
import { TR_NS } from '../../constants/translationNamespace';

const EmployeeExperience = ({year, event}) => {
	const {t} = useTranslation(TR_NS.EMPLOYEES)
    return (
            <Experience>
                <h3 className="year">{t(year)}</h3>
                <p className="description">{t(event)}</p>
            </Experience>
        )
}

export default EmployeeExperience;
