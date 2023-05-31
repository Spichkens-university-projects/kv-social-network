'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const useCurrentPage = (link: string) => {
	const [isCurrentPage, setIsCurrentPage] = useState<boolean>(false);
	const pathname = usePathname();

	useEffect(() => {
		setIsCurrentPage(pathname === link);
	}, [link, pathname]);

	return { isCurrentPage };
};

export default useCurrentPage;
