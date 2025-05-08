import Hero from '@/pages/Hero'
import Events from '@/pages/Events'
import Location from '@/pages/Location';
import Gifts from '@/pages/Gifts';
import DressCode from '@/pages/DressCode';
import RSVP from '@/pages/RSVP';

// Main Invitation Content
export default function MainContent() {
    return (
        <>
            <Hero />
            <RSVP />
            <DressCode />
            <Events />
            <Location />
        </>
    )
}