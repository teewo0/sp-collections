import { createContext, useState } from 'react'


const MobileNavContext = createContext({
	mobilePane: Boolean,
	showMobilePane: function () {},
	hideMobilePane: function () {},
})

export const MobileNavContextProvider = (props) => {
	const [showMobileNavPane, setShowMobileNavPane] = useState(false)

    const showPane = () => setShowMobileNavPane(true)
    const hidePane = () => setShowMobileNavPane(false)

    
	const context = {
        mobilePane: showMobileNavPane,
		showMobilePane: showPane,
		hideMobilePane: hidePane,
	}

	return (
		<MobileNavContext.Provider value={context}>
			{props.children}
		</MobileNavContext.Provider>
	)
}

export default MobileNavContext
