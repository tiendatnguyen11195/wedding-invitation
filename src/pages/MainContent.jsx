import Hero from '@/pages/Hero'
import Events from '@/pages/Events'
import Location from '@/pages/Location';
import Gifts from '@/pages/Gifts';
import DressCode from '@/pages/DressCode'

// Main Invitation Content
export default function MainContent() {
    return (
        <>
            <Hero />
            <DressCode />
            <Events />
            <Location />
            <Gifts />
        </>
    )
}