export type Invoice = {
  total: number;
};

export type Receipt = {
  total: number;
  deposit: number;
  change: number;
};

export type Payment = {
  type: 'CASH' | 'COUPON';
  percentage?: number;
  amount?: number;
};

// 支払いの合計を計算
function calculateDeposit(invoiceTotal: number, payments: Payment[]): number {
  let deposit = 0;

  // 支払いをソート: 現金(CASH)の支払いを後ろに移動させる
  payments.sort((a, b) => {
    if (a.type === 'CASH' && b.type !== 'CASH') {
      return 1;
    }
    if (a.type !== 'CASH' && b.type === 'CASH') {
      return -1;
    }
    return 0;
  });

  for (const payment of payments) {
    if (payment.type === 'COUPON') {
      if (payment.percentage != null) {
        deposit += Math.floor(invoiceTotal * (payment.percentage / 100));
      } else {
        deposit += payment.amount || 0;
      }
    } else {
      if (deposit >= invoiceTotal) {
        throw new Error('OverCharge');
      }
      deposit += payment.amount || 0;
    }
  }
  return deposit;
}

// すべての支払いがクーポンかどうかをチェック
function isAllPaymentsCoupon(payments: Payment[]): boolean {
  return payments.every((payment) => payment.type === 'COUPON');
}

export function charge(invoice: Invoice, payments: Payment[]): Receipt {
  const total = invoice.total;
  const deposit = calculateDeposit(total, payments);

  if (total > deposit) {
    throw new Error('Shortage');
  }

  const change = isAllPaymentsCoupon(payments) ? 0 : deposit - total;

  return { total, deposit, change };
}
