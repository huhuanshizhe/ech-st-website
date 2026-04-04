'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { ArrowLeft, Search, Download, FileText, ClipboardList } from 'lucide-react';
import { clsx } from 'clsx';

// MCCB产品数据 (基于客户资料)
const mccbProducts = [
  {
    id: 'echstm6',
    model: 'ECHSTM6',
    name: { en: 'Thermomagnetic Molded Case Circuit Breaker', zh: '热磁式塑壳断路器' },
    image: '/images/products/mccb/main.jpg',
    pdfs: ['ECHSTM6-Thermomagnetic Molded Case Circuit Breaker.pdf'],
    description: { en: 'Standard thermomagnetic MCCB for industrial applications', zh: '工业应用标准热磁式塑壳断路器' },
    specs: { en: 'Frame: 125A-1250A, Breaking Capacity: 25-85kA', zh: '框架：125A-1250A，分断能力：25-85kA' },
  },
  {
    id: 'echstm6e',
    model: 'ECHSTM6E',
    name: { en: 'Electronic Molded Case Circuit Breaker', zh: '电子式塑壳断路器' },
    image: '/images/products/mccb/echstm6e.jpg',
    pdfs: ['ECHSTM6E-Electronic Molded Case Circuit Breaker.pdf'],
    description: { en: 'Electronic MCCB with precise protection settings', zh: '精确保护设置电子式塑壳断路器' },
    specs: { en: 'Frame: 250A-400A, Electronic Trip Unit', zh: '框架：250A-400A，电子脱扣单元' },
  },
  {
    id: 'echstm6le',
    model: 'ECHSTM6LE',
    name: { en: 'Residual Current Operated Circuit Breaker', zh: '剩余电流动作断路器' },
    image: '/images/products/mccb/echstm6le.jpg',
    pdfs: ['ECHSTM6LE-250 Residual Current Operated Circuit Breaker.pdf'],
    description: { en: 'MCCB with earth leakage protection', zh: '带漏电保护的塑壳断路器' },
    specs: { en: 'Rated Residual Current: 30mA-300mA', zh: '额定剩余电流：30mA-300mA' },
  },
  {
    id: 'echstm6zy',
    model: 'ECHSTM6ZY',
    name: { en: 'IoT Intelligent Circuit Breaker', zh: '物联网智能断路器' },
    image: '/images/products/mccb/echstm6zy.jpg',
    pdfs: ['ECHSTM6ZY-250M-IoT Intelligent Circuit Breaker.pdf', 'ECHSTM6ZY-400MP-IoT circuit breaker.pdf'],
    description: { en: 'Smart MCCB with remote monitoring & control', zh: '远程监控智能塑壳断路器' },
    specs: { en: '4G/WiFi communication, Cloud platform', zh: '4G/WiFi通信，云平台管理' },
  },
  {
    id: 'echstm7dc',
    model: 'ECHSTM7DC',
    name: { en: 'New Energy DC Circuit Breaker', zh: '新能源直流断路器' },
    image: '/images/products/mccb/echstm7dc.jpg',
    pdfs: ['ECHSTM7DC-630-New Energy DC Circuit Breaker.pdf'],
    description: { en: 'DC MCCB for solar & energy storage applications', zh: '光伏与储能应用直流断路器' },
    specs: { en: 'Rated Voltage: DC 1000V, Current: 630A', zh: '额定电压：DC 1000V，电流：630A' },
  },
  {
    id: 'echstm6ey-lc',
    model: 'ECHSTM6EY-LC',
    name: { en: 'Intelligent Measurement Circuit Breaker', zh: '智能测量断路器' },
    image: '/images/products/mccb/echstm6ey-lc.jpg',
    pdfs: ['ECHSTM6EY-LC-Intelligent Measurement Circuit Breaker.pdf'],
    description: { en: 'State Grid dedicated metering circuit breaker', zh: '国网专用智能测量断路器' },
    specs: { en: 'Built-in metering, LCD display', zh: '内置计量，LCD显示屏' },
  },
];

const mcbProducts = [
  {
    id: 'mcb-standard',
    model: 'ECHMCB',
    name: { en: 'Miniature Circuit Breaker', zh: '小型断路器' },
    image: '/images/products/mcb/mcb.jpg',
    pdfs: ['MCB Product Catalog.pdf'],
    description: { en: 'Standard MCB for residential & commercial', zh: '住宅与商用小型断路器' },
    specs: { en: '1P-4P, 6A-63A, 6kA/10kA', zh: '1P-4P，6A-63A，6kA/10kA' },
  },
  {
    id: 'type-b-rcbo',
    model: 'Type-B RCBO',
    name: { en: 'Type B RCBO', zh: 'B型漏电断路器' },
    image: '/images/products/mcb/type-b-rcbo.jpg',
    pdfs: ['Type-B-RCBO.pdf'],
    description: { en: 'Type B residual current breaker for smooth DC detection', zh: 'B型漏电断路器，可检测平滑直流' },
    specs: { en: 'Detects AC, pulsating DC, smooth DC', zh: '检测交流、脉冲直流、平滑直流' },
  },
  {
    id: '100b-rccb',
    model: '100B RCCB',
    name: { en: '100B RCCB', zh: '100B型漏电保护器' },
    image: '/images/products/mcb/100b-rccb.jpg',
    pdfs: ['100B-RCCB.pdf', 'RCCB B type.pdf'],
    description: { en: 'RCCB for comprehensive leakage protection', zh: '全面漏电保护器' },
    specs: { en: '1P+N, 2P, rated 30mA-300mA', zh: '1P+N, 2P，额定30mA-300mA' },
  },
];

const circuitProtectionProducts = [
  {
    id: 'mov-7d-20d',
    model: 'MOV 7D-20D',
    name: { en: 'Metal Oxide Varistor 7D-20D Series', zh: '压敏电阻 7D-20D系列' },
    image: '/images/products/mov/mov.jpg',
    pdfs: ['Metal Oxide Varistor(MOV) -7D 10D 14D 20DSeries.pdf', 'Metal Oxide Varistor (MOV) Datasheet.pdf'],
    description: { en: 'MOV for voltage surge protection', zh: '电压浪涌保护压敏电阻' },
    specs: { en: 'Diameter: 7mm-20mm, Voltage: 18V-1100V', zh: '直径：7mm-20mm，电压：18V-1100V' },
  },
  {
    id: 'mov-25d-60d',
    model: 'MOV 25D-60D',
    name: { en: 'Metal Oxide Varistor 25D-60D Series', zh: '压敏电阻 25D-60D系列' },
    image: '/images/products/mov/mov-large.jpg',
    pdfs: ['Metal Oxide Varistor(MOV) -25D 34S 40S 40D 48R 54R 60D Series.pdf'],
    description: { en: 'High energy MOV for industrial applications', zh: '工业应用高能量压敏电阻' },
    specs: { en: 'High surge current capability', zh: '高浪涌电流能力' },
  },
  {
    id: 'spd',
    model: 'ECHSPD',
    name: { en: 'Surge Protective Device', zh: '浪涌保护器' },
    image: '/images/products/spd/spd.jpg',
    pdfs: ['Surge Protective Device and Backup Protector Selection Guide.pdf'],
    description: { en: 'SPD for power system surge protection', zh: '电力系统浪涌保护器' },
    specs: { en: 'Class I/II/III, Up to 100kA', zh: 'I/II/III级，最高100kA' },
  },
];

const energyStorageProducts = [
  {
    id: 'ess-all-in-one',
    model: 'ECH-ESS-AIO',
    name: { en: 'All-in-One Energy Storage System', zh: '一体式储能系统' },
    image: '/images/products/energy-storage/all-in-one.jpg',
    pdfs: ['ESS_All-in-one.pdf'],
    description: { en: 'Complete turnkey energy storage solution', zh: '完整交钥匙储能解决方案' },
    specs: { en: 'Grid-forming PCS, BMU, EMS included', zh: '含网构型PCS、BMU、EMS' },
  },
  {
    id: 'solar-storage',
    model: 'ECH-SOLAR-ESS',
    name: { en: 'Solar Energy Storage System', zh: '太阳能储能系统' },
    image: '/images/products/energy-storage/solar.jpg',
    pdfs: ['SOLAR ENERGY STORAGE SYSTEM.pdf'],
    description: { en: 'Solar integrated storage solution', zh: '光伏一体化储能解决方案' },
    specs: { en: 'PV + Battery + PCS integrated', zh: '光伏+电池+PCS集成' },
  },
  {
    id: 'cni-storage',
    model: 'ECH-CNI-ESS',
    name: { en: 'C&I Energy Storage', zh: '工商业储能' },
    image: '/images/products/energy-storage/cni.jpg',
    pdfs: ['C&I Energy Storage.pdf'],
    description: { en: 'Commercial & Industrial energy storage', zh: '工商业储能系统' },
    specs: { en: '100kWh-1MWh scalable', zh: '100kWh-1MWh可扩展' },
  },
];

const intelligentProducts = [
  {
    id: 'smart-fuse',
    model: 'Smart Cutout',
    name: { en: 'Intelligent Drop-Out Fuse', zh: '智能跌落式熔断器' },
    image: '/images/products/intelligent/smart-fuse.jpg',
    pdfs: ['Product Manual for Smart Cutout.pdf'],
    description: { en: 'Smart drop-out fuse with remote monitoring', zh: '带远程监控的智能跌落式熔断器' },
    specs: { en: 'Real-time status monitoring', zh: '实时状态监测' },
  },
  {
    id: 'zw32-12',
    model: 'ZW32-12',
    name: { en: 'Primary-Secondary Integrated Pole-Mounted Circuit Breaker', zh: '一二次融合柱上断路器' },
    image: '/images/products/intelligent/zw32-12.jpg',
    pdfs: ['ZW32-12_Product_Manual_EN.pdf'],
    description: { en: 'Integrated pole-mounted circuit breaker', zh: '一二次融合柱上断路器' },
    specs: { en: '12kV rated, vacuum interrupter', zh: '12kV额定，真空灭弧' },
  },
];

const rs485Products = [
  {
    id: 'ech485eesa',
    model: 'ECH485EESA',
    name: { en: 'RS485 Serial Communication Chip', zh: 'RS485串行通信芯片' },
    image: '/images/products/rs485/rs485.jpg',
    pdfs: ['RS485(ECH485EESA、ECH485NEESA)-Specification sheet.pdf'],
    description: { en: 'Half-duplex RS485 transceiver', zh: '半双工RS485收发器' },
    specs: { en: 'Low power, ESD protection', zh: '低功耗，ESD保护' },
  },
];

const capacitorProducts = [
  {
    id: 'capacitor',
    model: 'ECH-CAP',
    name: { en: 'Capacitor Series', zh: '电容系列' },
    image: '/images/products/capacitor/capacitor.jpg',
    pdfs: ['Capacitor Catalogue.pdf'],
    description: { en: 'Capacitors for electrical applications', zh: '电气应用电容' },
    specs: { en: 'Various capacitance values', zh: '多种容量规格' },
  },
];

const accessoryProducts = [
  {
    id: 'mccb-accessories',
    model: 'Accessory Series',
    name: { en: 'MCCB Accessories', zh: '断路器附件' },
    image: '/images/products/accessories/accessories.jpg',
    pdfs: ['Accessory series.pdf'],
    description: { en: 'Accessories for MCCB including shunt trip, undervoltage release', zh: '断路器附件：分励脱扣、欠压脱扣等' },
    specs: { en: 'Shunt trip, UV release, auxiliary contacts', zh: '分励脱扣、欠压脱扣、辅助触点' },
  },
];

const getProductData = (category: string) => {
  switch (category) {
    case 'mccb': return mccbProducts;
    case 'mcb': return mcbProducts;
    case 'circuit-protection': return circuitProtectionProducts;
    case 'energy-storage': return energyStorageProducts;
    case 'intelligent-devices': return intelligentProducts;
    case 'rs485': return rs485Products;
    case 'capacitor': return capacitorProducts;
    case 'accessories': return accessoryProducts;
    default: return [];
  }
};

const getCategoryInfo = (category: string, locale: string) => {
  const infos: Record<string, { en: { name: string; desc: string }; zh: { name: string; desc: string } }> = {
    'mccb': { en: { name: 'MCCB', desc: 'Molded Case Circuit Breakers' }, zh: { name: '塑壳断路器', desc: '热磁式与电子式塑壳断路器' } },
    'mcb': { en: { name: 'MCB', desc: 'Miniature Circuit Breakers' }, zh: { name: '小型断路器', desc: '小型断路器及漏电保护器' } },
    'circuit-protection': { en: { name: 'Circuit Protection', desc: 'SPD, MOV and Protection Devices' }, zh: { name: '电路保护器件', desc: '浪涌保护器、压敏电阻等' } },
    'energy-storage': { en: { name: 'Energy Storage', desc: 'Microgrid & ESS Solutions' }, zh: { name: '储能系统', desc: '微电网与储能系统解决方案' } },
    'intelligent-devices': { en: { name: 'Intelligent Devices', desc: 'Smart Grid Devices' }, zh: { name: '智能设备', desc: '智能电网设备' } },
    'rs485': { en: { name: 'RS485 Chip', desc: 'Serial Communication Chips' }, zh: { name: 'RS485芯片', desc: '串行通信芯片' } },
    'accessories': { en: { name: 'Accessories', desc: 'MCCB/MCB Accessories' }, zh: { name: '附件', desc: '断路器配套附件' } },
  };
  return infos[category] || { en: { name: category, desc: '' }, zh: { name: category, desc: '' } };
};

export default function CategoryPage({ locale, categorySlug }: { locale: string; categorySlug: string }) {
  const t = useTranslations('products');
  const currentLocale = useLocale();
  const [searchQuery, setSearchQuery] = useState('');
  
  const products = getProductData(categorySlug);
  const categoryInfo = getCategoryInfo(categorySlug, locale);
  
  const filteredProducts = products.filter(product => {
    const name = currentLocale === 'zh' ? product.name.zh : product.name.en;
    return name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           product.model.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-700 to-primary-900 text-white py-8">
        <div className="container-custom">
          <Link href="/products" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4">
            <ArrowLeft className="w-4 h-4" />
            {currentLocale === 'zh' ? '返回产品列表' : 'Back to Products'}
          </Link>
          <h1 className="text-3xl font-bold">
            {currentLocale === 'zh' ? categoryInfo.zh.name : categoryInfo.en.name}
          </h1>
          <p className="text-gray-200 mt-2">
            {currentLocale === 'zh' ? categoryInfo.zh.desc : categoryInfo.en.desc}
          </p>
        </div>
      </div>

      <div className="container-custom py-8">
        {/* Search */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={currentLocale === 'zh' ? '搜索产品型号或名称...' : 'Search product model or name...'}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="card group">
              <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
                <img
                  src={product.image}
                  alt={currentLocale === 'zh' ? product.name.zh : product.name.en}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <div className="text-sm text-primary-600 font-medium mb-1">{product.model}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {currentLocale === 'zh' ? product.name.zh : product.name.en}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {currentLocale === 'zh' ? product.description.zh : product.description.en}
                </p>
                <div className="text-sm text-gray-500 mb-4">
                  {currentLocale === 'zh' ? product.specs.zh : product.specs.en}
                </div>
                
                {/* PDF Downloads */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.pdfs.map((pdf, index) => (
                    <a
                      key={index}
                      href={`/pdfs/${pdf}`}
                      target="_blank"
                      className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 hover:bg-primary-50 text-gray-600 hover:text-primary-600 rounded text-sm transition-colors"
                    >
                      <FileText className="w-4 h-4" />
                      {currentLocale === 'zh' ? '规格书' : 'Datasheet'}
                    </a>
                  ))}
                </div>
                
                {/* Actions */}
                <div className="flex gap-2">
                  <Link
                    href={`/contact?product=${product.model}`}
                    className="btn-primary flex-1 flex items-center justify-center gap-2 text-sm py-2"
                  >
                    <ClipboardList className="w-4 h-4" />
                    {t('requestQuote')}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            {t('noResults')}
          </div>
        )}
      </div>
    </div>
  );
}