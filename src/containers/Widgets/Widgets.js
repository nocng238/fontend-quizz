import React from 'react';
import { Row, Col } from 'antd';

import LayoutWrapper from '@iso/components/utility/layoutWrapper';
import basicStyle from '@iso/assets/styles/constants';
import IsoWidgetsWrapper from './WidgetsWrapper';
import CardWidget from './Card/CardWidget';
import ProgressWidget from './Progress/ProgressWidget';
import SingleProgressWidget from './Progress/ProgressSingle';
import ReportsWidget from './Report/ReportWidget';
import StickerWidget from './Sticker/StickerWidget';
import SaleWidget from './Sale/SaleWidget';
import IntlMessages from '@iso/components/utility/intlMessages';

const styles = {
  wisgetPageStyle: {
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'flex-start',
    overflow: 'hidden',
  },
};
const SIGNLE_PROGRESS_WIDGET = [
  {
    label: 'widget.singleprogresswidget1.label',
    percent: 70,
    barHeight: 7,
    status: 'active',
    info: true,
  },
  {
    label: 'widget.singleprogresswidget2.label',
    percent: 80,
    barHeight: 7,
    status: 'active',
    info: true,
  },
  {
    label: 'widget.singleprogresswidget3.label',
    percent: 40,
    barHeight: 7,
    status: 'active',
    info: true,
  },
  {
    label: 'widget.singleprogresswidget4.label',
    percent: 60,
    barHeight: 7,
    status: 'active',
    info: true,
  },
];

const STICKER_WIDGET = [
  {
    number: 'widget.stickerwidget1.number',
    text: 'widget.stickerwidget1.text',
    icon: 'ion-email-unread',
    fontColor: '#ffffff',
    bgColor: '#7266BA',
  },
  {
    number: 'widget.stickerwidget1.number',
    text: 'widget.stickerwidget2.text',
    icon: 'ion-android-camera',
    fontColor: '#ffffff',
    bgColor: '#42A5F6',
  },
  {
    number: 'widget.stickerwidget1.number',
    text: 'widget.stickerwidget3.text',
    icon: 'ion-chatbubbles',
    fontColor: '#ffffff',
    bgColor: '#7ED320',
  },
  {
    number: 'widget.stickerwidget1.number',
    text: 'widget.stickerwidget4.text',
    icon: 'ion-android-cart',
    fontColor: '#ffffff',
    bgColor: '#F75D81',
  },
];

const SALE_WIDGET = [
  {
    label: 'widget.salewidget1.label',
    price: 'widget.salewidget1.price',
    details: 'widget.salewidget1.details',
    fontColor: '#F75D81',
  },
  {
    label: 'widget.salewidget2.label',
    price: 'widget.salewidget2.price',
    details: 'widget.salewidget2.details',
    fontColor: '#F75D81',
  },
  {
    label: 'widget.salewidget3.label',
    price: 'widget.salewidget3.price',
    details: 'widget.salewidget3.details',
    fontColor: '#F75D81',
  },
  {
    label: 'widget.salewidget4.label',
    price: 'widget.salewidget4.price',
    details: 'widget.salewidget4.details',
    fontColor: '#F75D81',
  },
];

const CARD_WIDGET = [
  {
    icon: 'ion-android-chat',
    iconcolor: '#42A5F5',
    number: 'widget.cardwidget1.number',
    text: 'widget.cardwidget1.text',
  },
  {
    icon: 'ion-music-note',
    iconcolor: '#F75D81',
    number: 'widget.cardwidget2.number',
    text: 'widget.cardwidget2.text',
  },
  {
    icon: 'ion-trophy',
    iconcolor: '#FEAC01',
    number: 'widget.cardwidget3.number',
    text: 'widget.cardwidget3.text',
  },
];

const PROGRESS_WIDGET = [
  {
    label: 'widget.progresswidget1.label',
    details: 'widget.progresswidget1.details',
    icon: 'ion-archive',
    iconcolor: '#4482FF',
    percent: 50,
    barHeight: 7,
    status: 'active',
  },
  {
    label: 'widget.progresswidget2.label',
    details: 'widget.progresswidget2.details',
    icon: 'ion-pie-graph',
    iconcolor: '#F75D81',
    percent: 80,
    barHeight: 7,
    status: 'active',
  },
  {
    label: 'widget.progresswidget3.label',
    details: 'widget.progresswidget3.details',
    icon: 'ion-android-download',
    iconcolor: '#494982',
    percent: 65,
    barHeight: 7,
    status: 'active',
  },
];

export default function () {
  const { rowStyle, colStyle } = basicStyle;

  return (
    <LayoutWrapper>
      <div style={styles.wisgetPageStyle}>
        <Row style={rowStyle} gutter={0} justify='start'>
          <Col lg={8} md={12} sm={24} xs={24} style={colStyle}>
            <IsoWidgetsWrapper>
              <ReportsWidget
                label={<IntlMessages id='widget.reportswidget.label' />}
                details={<IntlMessages id='widget.reportswidget.details' />}
              >
                {SIGNLE_PROGRESS_WIDGET.map((widget, idx) => (
                  <SingleProgressWidget
                    key={idx}
                    label={<IntlMessages id={widget.label} />}
                    percent={widget.percent}
                    barHeight={widget.barHeight}
                    status={widget.status}
                    info={widget.info}
                  />
                ))}
              </ReportsWidget>
            </IsoWidgetsWrapper>
          </Col>
        </Row>

        <Row style={rowStyle} gutter={0} justify='start'>
          {STICKER_WIDGET.map((widget, idx) => (
            <Col lg={6} md={12} sm={12} xs={24} style={colStyle} key={idx}>
              <IsoWidgetsWrapper>
                {/* Sticker Widget */}
                <StickerWidget
                  number={<IntlMessages id={widget.number} />}
                  text={<IntlMessages id={widget.text} />}
                  icon={widget.icon}
                  fontColor={widget.fontColor}
                  bgColor={widget.bgColor}
                />
              </IsoWidgetsWrapper>
            </Col>
          ))}
        </Row>

        <Row style={rowStyle} gutter={0} justify='start'>
          {SALE_WIDGET.map((widget, idx) => (
            <Col lg={6} md={12} sm={12} xs={24} style={colStyle} key={idx}>
              <IsoWidgetsWrapper>
                {/* Sale Widget */}
                <SaleWidget
                  label={<IntlMessages id={widget.label} />}
                  price={<IntlMessages id={widget.price} />}
                  details={<IntlMessages id={widget.details} />}
                  fontColor={widget.fontColor}
                />
              </IsoWidgetsWrapper>
            </Col>
          ))}
        </Row>

        <Row style={rowStyle} gutter={0} justify='start'>
          <Col lg={6} md={12} sm={12} xs={24} style={colStyle}>
            {CARD_WIDGET.map((widget, idx) => (
              <IsoWidgetsWrapper key={idx} gutterBottom={20}>
                {/* Card Widget */}
                <CardWidget
                  icon={widget.icon}
                  iconcolor={widget.iconcolor}
                  number={<IntlMessages id={widget.number} />}
                  text={<IntlMessages id={widget.text} />}
                />
              </IsoWidgetsWrapper>
            ))}
          </Col>

          <Col lg={6} md={12} sm={12} xs={24} style={colStyle}>
            {PROGRESS_WIDGET.map((widget, idx) => (
              <IsoWidgetsWrapper key={idx} gutterBottom={20}>
                {/* Progress Widget */}
                <ProgressWidget
                  label={<IntlMessages id={widget.label} />}
                  details={<IntlMessages id={widget.details} />}
                  icon={widget.icon}
                  iconcolor={widget.iconcolor}
                  percent={widget.percent}
                  barHeight={widget.barHeight}
                  status={widget.status}
                />
              </IsoWidgetsWrapper>
            ))}
          </Col>
        </Row>
      </div>
    </LayoutWrapper>
  );
}
