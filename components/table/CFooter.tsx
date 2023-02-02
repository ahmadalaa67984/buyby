import {
  Box,
  Button,
  ButtonGroup,
  chakra,
  Flex,
  Icon,
  IconButton,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { MdFileDownload } from "react-icons/md";
import React, { useEffect, useMemo, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../services/combinedReducers";
// import { CSVLink } from "react-csv";
// import { getAllArchiveCampaignsRequest } from '../../modules/restaurant/campaigns-management/Actions';
// import { getAllArchiveItemsRequest } from '../../modules/restaurant/item-management/Actions';
// import { getAllArchiveProfilesRequest } from '../../modules/profiles/Actions';
import useTranslation from "../../assets/lang";
// import MultiQrCode from 'components/qr/MultiQrCode';
import { IoQrCode } from "react-icons/io5";
import Link from "next/link";

const CFooter = ({
  pageIndex,
  pageOptions,
  footerBtnTitle,
  setPage,
  totalPage,
  setPerPage,
  currentpage,
  setPageNumber,
  archiveFn,
  idx,
  Data,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  // useEffect(() => {
  //     if (archiveFn == 'campaign') dispatch(getAllArchiveCampaignsRequest());
  //     else if (archiveFn == 'items') dispatch(getAllArchiveItemsRequest());
  //     else if (archiveFn == 'profile') dispatch(getAllArchiveProfilesRequest());
  // }, []);
  // const [length, setLength] = useState(0);
  // const archiveItems = useSelector((state: RootState) => state.items.archiveItems);
  // const archiveCampaigns = useSelector((state: RootState) => state.campaigns.archiveCampaigns);
  // const archiveProfile = useSelector((state: RootState) => state.profiles.archiveProfiles);
  // const { Translate } = useTranslation();
  // const tabelFooterComponent = Translate('components')?.table;
  const data = [];

  // const length = archiveCampaigns.length || archiveItems.length || archiveProfile.length;

  // useEffect(() => {
  //     if (archiveFn == 'campaign') setLength(archiveCampaigns.length);
  //     else if (archiveFn == 'items') setLength(archiveItems.length);
  //     else if (archiveFn == 'profile') setLength(archiveProfile.length);
  // }, [archiveFn]);

  // archiveFn == 'items' &&
  //     archiveItems?.map((item) => {
  //         data.push({
  //             alcoholDegree: item?.alcoholDegree,
  //             alcoholPresence: item?.alcoholPresence,
  //             brandName: item?.brandName,
  //             campaignPrice1: item?.campaignPrice1,
  //             campaignPrice2: item?.campaignPrice2,
  //             categoryLevel0: item?.categoryLevel0,
  //             categoryLevel1: item?.categoryLevel1,
  //             createdAt: item?.createdAt,
  //             criticsScoreJR: item?.criticsScoreJR,
  //             criticsScoreRFV: item?.criticsScoreRFV,
  //             criticsScoreWA: item?.criticsScoreWA,
  //             criticsScoreWS: item?.criticsScoreWS,
  //             description: item?.description?.mainLanguage,
  //             dietCompatibility: item?.dietCompatibility,
  //             domainName: item?.domainName,
  //             donenessLevel: item?.donenessLevel,
  //             menus: item?.menus,
  //             name: item?.name?.mainLanguage,
  //             picture: item?.picture,
  //             restaurantId: item?.restaurantId,
  //             restaurantSystemCode1: item?.restaurantSystemCode1,
  //             restaurantSystemCode2: item?.restaurantSystemCode2,
  //             service: item?.service,
  //             standardPrice: item?.standardPrice,
  //             status: item?.status,

  //             // totalCalories: item?.totalCalories,
  //             updatedAt: item?.updatedAt,
  //             vat: item?.vat,
  //             vintageYear: item?.vintageYear,
  //             wineColor: item?.wineColor,
  //             wineStillness: item?.wineStillness
  //         });
  //     });

  // archiveFn == 'campaign' &&
  //     archiveCampaigns?.map((campaign) => {
  //         data.push({
  //             ID: campaign.ID,
  //             alwaysAvailable: campaign.alwaysAvailable,
  //             capAmount: campaign.capAmount,
  //             capType: campaign.capType,
  //             createdAt: campaign.createdAt,
  //             menuId: campaign.menuId,
  //             name: campaign.name,
  //             price: campaign.price,
  //             repeatOn: campaign.repeatOn,
  //             restaurantId: campaign.restaurantId,
  //             scheduleEnd: campaign.scheduleEnd,
  //             scheduleEndDate: campaign.scheduleEndDate,
  //             timeSlotsFrom: campaign.timeSlots?.map((from) => {
  //                 return from.from;
  //             }),
  //             timeSlotsTo: campaign.timeSlots?.map((to) => {
  //                 return to.to;
  //             }),
  //             type: campaign.type,
  //             updatedAt: campaign.updatedAt,
  //             visible: campaign.visible
  //         });
  //     });

  // archiveFn == 'profile' &&
  //     archiveProfile?.map((profile) => {
  //         data.push({
  //             'First Name': profile.firstName,
  //             'Last Name': profile.lastName,
  //             Email: profile.email,
  //             Role: profile.role,
  //             Status: profile.status,
  //             Active: profile.active,
  //             'Created At': profile.createdAt,
  //             'Restaurant Id': profile.restaurantId
  //         });
  //     });

  return (
    <Flex justify='space-between' align='center' mb='5' mt='4'>
      {/* <Flex align='center'>
        {footerBtnTitle && length > 0 ? (
          <CSVLink
            data={data}
            filename={archiveFn + Date.now().toString() + ".csv"}>
            <ButtonGroup isAttached variant='outline'>
              <Button
                fontSize='18'
                variant='link'
                color='primary'
                textDecoration={"underline"}
                alignContent='center'
                isFullWidth={true}>
                <IconButton
                                style={{ padding: '10px 15px 10px 5px' }}
                                aria-label="Download archived profiles"
                                color="primary"
                                icon={<BiArrowBack fontSize="22px" />}
                                border="none"
                                isDisabled={length > 0 ? false : true}
                            />
                <Icon as={MdFileDownload} fontSize='18px' w={6} h={6} mr='3' />
                {footerBtnTitle}
              </Button>
            </ButtonGroup>
          </CSVLink>
        ) : (
          ""
        )}
      </Flex> */}
      <Box>
        <Flex align='center'>
          <span style={{ marginRight: "10px", color: "#1B2028" }}>
            {idx} <span style={{ opacity: "0.5" }}>/ {totalPage}</span>
          </span>

          <IconButton
            mr='1'
            ml='1'
            bg={idx === 1 ? "secondary_variants.300" : "secondary_variants.700"}
            borderRadius='20px'
            aria-label='previousPage'
            _hover={{
              bg:
                idx === 1 ? "secondary_variants.300" : "secondary_variants.700",
            }}
            onClick={() => {
              router.push({
                pathname: router.pathname,
                query: { ...router.query, idx: idx - 1 },
              });
            }}
            disabled={idx === 1}
            icon={
              router.locale == "ar" ? (
                <Icon
                  as={IoIosArrowForward}
                  color={idx === 1 ? "#596235" : "white"}
                />
              ) : (
                <Icon
                  as={IoIosArrowBack}
                  color={idx === 1 ? "#596235" : "white"}
                />
              )
            }
          />
          <IconButton
            mr='1'
            ml='1'
            bg={idx >= totalPage ? "secondary_variants.300" : "secondary"}
            borderRadius='20px'
            aria-label='nextPage'
            _hover={{
              bg: idx >= totalPage ? "secondary_variants.300" : "secondary",
            }}
            onClick={() => {
              // window.location.href = `${router.pathname}/`
              router.push({
                pathname: router.pathname,
                query: { ...router.query, idx: idx + 1 },
              });
              // setPage((prev) => prev + 1);
              // setPerPage((prev) => prev + 10);
            }}
            disabled={idx >= totalPage}
            icon={
              router.locale == "ar" ? (
                <Icon
                  as={IoIosArrowBack}
                  color={
                    idx >= totalPage
                      ? "secondary_variants.300"
                      : "secondary_variants.700"
                  }
                />
              ) : (
                <Icon
                  as={IoIosArrowForward}
                  color={idx >= totalPage ? "secondary" : "#fff"}
                />
              )
            }></IconButton>
        </Flex>
      </Box>
    </Flex>
  );
};

export default CFooter;
