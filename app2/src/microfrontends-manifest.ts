type MicrofrontendManifest = {
	appName: string
	appDisplayName: string
	iconName: string
	hostAppPath: string
	groupName: string
	enabled: boolean
}

const microfrontendsManifest: MicrofrontendManifest = {
	appName: 'app2',
	appDisplayName: 'Vendors Profile',
	iconName: 'VendorsMenu',
	hostAppPath: '/app2_profile',
	groupName: 'configuration',
	enabled: true,
};

export default microfrontendsManifest;
